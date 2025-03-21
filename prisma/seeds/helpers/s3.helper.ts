import {
	DeleteObjectCommand,
	ListObjectsCommand,
	S3Client,
} from "@aws-sdk/client-s3";

export async function deleteObjectsAndDir(
	s3: S3Client,
	mainDir: string,
): Promise<void> {
	const objects = await s3.send(
		new ListObjectsCommand({
			Bucket: process.env.S3_BUCKET_NAME,
		}),
	);

	if (objects.Contents) {
		for (const object of objects.Contents) {
			if (object.Key?.includes(mainDir)) {
				await s3.send(
					new DeleteObjectCommand({
						Bucket: process.env.S3_BUCKET_NAME,
						Key: object.Key,
					}),
				);
			}
		}
	}
}
