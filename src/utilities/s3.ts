require('aws-sdk/lib/maintenance_mode_message').suppress = true;
import { S3 } from "aws-sdk";

const s3 = new S3({ region: "us-east-2" });


export async function downloadFileFromS3(key: string, bucket: string) {
    const downloadParams = {
      Bucket: bucket,
      Key: key,
    };
  
    const result = await s3.getObject(downloadParams).promise();
    return result;
  }

export async function uploadIfFileDoesNotExist(key: string, bucketName: string, file: Buffer) {
  const fileExists = await checkIfFileExists(key, bucketName);

  if (!fileExists) {
    await uploadFileToS3(key, bucketName, file);
  }
}

export async function checkIfFileExists(key: string, bucketName: string) {
  try {
    await s3.headObject({ Key: key, Bucket: bucketName }).promise();
    return true; // Object exists
  } catch (error: any) {
    if (error.code === "NotFound") {
      return false; // Object does not exist
    }
    throw error;
  }
}

export async function uploadFileToS3(key: string, bucket: string, file: Buffer) {
  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: file,
  };

  const result = await s3.upload(uploadParams).promise();
  console.log(`File uploaded to S3 bucket: ${result.Location}`);
  return result;
}
