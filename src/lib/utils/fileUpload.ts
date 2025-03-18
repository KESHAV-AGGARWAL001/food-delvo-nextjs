import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

interface UploadResult {
  filePath: string;
  publicUrl: string;
}

export async function uploadFile(
  file: File,
  directory: string = "uploads",
  allowedTypes: string[] = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ]
): Promise<UploadResult> {
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`
    );
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error(
      `File size too large. Maximum size allowed: ${maxSize / 1024 / 1024}MB`
    );
  }
  const uploadDir = join(process.cwd(), "public", directory);
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
  const filename = `${Date.now()}-${sanitizedFileName}`;
  const filePath = join(uploadDir, filename);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);

  const publicUrl = `/${directory}/${filename}`.replace(/\\/g, "/");

  return {
    filePath,
    publicUrl,
  };
}
