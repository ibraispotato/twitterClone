// api/upload.js
import formidable from 'formidable';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

const s3 = new AWS.S3({
  accessKeyId: process.env.BLOB_READ_WRITE_TOKEN,
});

const uploadFileToS3 = (file) => {
  const fileStream = fs.createReadStream(file.filepath);
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: fileStream,
    Key: path.basename(file.filepath),
  };

  return s3.upload(uploadParams).promise();
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    try {
      const file = files.file[0];
      const data = await uploadFileToS3(file);
      res.status(200).json({ message: 'File uploaded successfully', data });
    } catch (uploadErr) {
      console.error('Error uploading file:', uploadErr);
      res.status(500).json({ error: 'Failed to upload file', uploadErr });
    }
  });
};
