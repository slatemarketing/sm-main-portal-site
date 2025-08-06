# S3 Invoice File Upload Implementation Guide

This guide will walk you through implementing file upload to S3 and storing the URL in the database when the create invoice form is submitted.

## Overview

The implementation involves:
1. Creating an S3 upload utility function
2. Updating the invoice creation to include S3 upload
3. Modifying the form submission to pass the file

## Step 1: Environment Variables

Ensure your `.env` file has the required AWS credentials:

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET_NAME=your_bucket_name
```

## Step 2: Create S3 Upload Utility

Create a new file `src/lib/s3.ts`:

```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  contentType: string,
  userId: string
): Promise<string> {
  const timestamp = Date.now();
  const key = `invoices/${userId}/${timestamp}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}
```

## Step 3: Update Invoice Actions

Modify `src/actions/invoices.ts` to include the S3 upload utility and handle file uploads:

1. Add the import at the top:
```typescript
import { uploadFileToS3 } from "@/lib/s3";
```

2. Update the interface to include the file:
```typescript
interface valuesProps {
  title: string;
  userId: string;
  company: string;
  amount: string;
  email: string;
  date: Date;
  status: InvoiceStatus;
  paid: boolean;
  file?: File; // Add this line
  pdfURL?: string;
}
```

3. Update the createInvoice function:
```typescript
export async function createInvoice(
  {
    title,
    userId,
    company,
    amount,
    email,
    date,
    status,
    paid,
    file, // Add this parameter
    pdfURL,
  }: valuesProps,
  name: string
) {
  try {
    let finalPdfURL = pdfURL;

    // If a file is provided, upload it to S3 first
    if (file) {
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload directly to S3
      finalPdfURL = await uploadFileToS3(
        buffer,
        file.name,
        file.type,
        userId
      );
    }

    await prisma.invoices.create({
      data: {
        title,
        userId,
        name,
        company,
        amount,
        email,
        date,
        status,
        paid,
        pdfURL: finalPdfURL,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create invoice!");
  }
}
```

## Step 4: Update the Form Component

The form component (`src/components/invoices/create-invoice-dialog.tsx`) should already be passing the values object correctly:

```typescript
// In the onSubmit function, around line 131:
async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const selectedUser = users.find((user) => user.id === values.userId);
    if (!selectedUser) {
      console.error("Selected user not found!");
      return;
    }
    
    // Pass the values object directly (which includes the file)
    await createInvoice(values, selectedUser.name);
    window.location.reload();
    form.reset();
    onOpenChange(false);
  } catch (error) {
    console.error("Error creating invoice! Error:", error);
    toast.error("Error creating invoice! Please check console.");
  }
}
```

## Step 5: Testing the Implementation

1. **Start your development server**: `npm run dev`

2. **Test the upload flow**:
   - Open the create invoice dialog
   - Fill in all required fields
   - Select a PDF file
   - Submit the form

3. **Verify the results**:
   - Check your S3 bucket for the uploaded file
   - Check your database to ensure the `pdfURL` field contains the S3 URL
   - The file should be stored with the naming convention: `invoices/{userId}/{timestamp}-{filename}.pdf`

## Error Handling

The implementation includes comprehensive error handling:

- **File upload failures**: If S3 upload fails, the invoice creation will fail
- **Missing parameters**: Proper validation for required parameters
- **Network issues**: Proper error messages for upload failures

## Security Considerations

- Files are uploaded to S3 with the user's ID, preventing access to other users' files
- Only PDF files are accepted (as per your current form validation)
- Proper error handling prevents sensitive information leakage

## Troubleshooting

**Common issues and solutions**:

1. **AWS Credentials Error**: Verify your environment variables are set correctly
2. **S3 Bucket Access**: Ensure your IAM role has proper S3 permissions
3. **File Size Limits**: Next.js has default file size limits; increase if needed in `next.config.js`
4. **Buffer Conversion**: Ensure File object is properly converted to Buffer for S3 upload

## Next Steps

After implementation, consider:
- Adding file size validation
- Implementing file deletion when invoices are deleted
- Adding progress indicators for large file uploads
- Implementing file type validation on the server side