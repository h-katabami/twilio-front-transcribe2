import { execFileSync } from "child_process";
import dotenv from "dotenv";
import path from "path";

const envFile = process.env.DEPLOY_ENV_FILE || ".env.local";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const command = process.argv[2];

const bucket = process.env.VITE_DEPLOY_S3_BUCKET || process.env.VITE_AUTH_COOKIE_STORAGE_DOMAIN;
const prefixSource = process.env.VITE_PATH_TEXT;

const required = ["AWS_PROFILE", "CLOUDFRONT_DISTRIBUTION_ID"];

const missing = [
  ...required.filter((key) => !process.env[key]),
  ...(bucket ? [] : ["VITE_DEPLOY_S3_BUCKET or VITE_AUTH_COOKIE_STORAGE_DOMAIN"]),
  ...(prefixSource ? [] : ["VITE_PATH_TEXT"]),
];

if (missing.length > 0) {
  console.error(`[deploy] Missing env: ${missing.join(", ")}. Loaded file: ${envFile}`);
  process.exit(1);
}

const profile = process.env.AWS_PROFILE;
const prefix = prefixSource.replace(/^\/+|\/+$/g, "");
const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;
const invalidatePath = `/${prefix}/*`;
const s3Destination = prefix ? `s3://${bucket}/${prefix}` : `s3://${bucket}`;

function runAws(args) {
  execFileSync("aws", args, { stdio: "inherit" });
}

if (command === "s3") {
  runAws(["--profile", profile, "s3", "sync", "dist/", s3Destination, "--delete"]);
} else if (command === "check") {
  console.log(`[deploy] envFile=${envFile}`);
  console.log(`[deploy] profile=${profile}`);
  console.log(`[deploy] s3Destination=${s3Destination}`);
  console.log(`[deploy] cloudfrontDistributionId=${distributionId}`);
  console.log(`[deploy] invalidatePath=${invalidatePath}`);
} else if (command === "invalidate") {
  runAws([
    "--profile",
    profile,
    "cloudfront",
    "create-invalidation",
    "--distribution-id",
    distributionId,
    "--paths",
    invalidatePath,
  ]);
} else if (command === "deploy") {
  runAws(["--profile", profile, "s3", "sync", "dist/", s3Destination, "--delete"]);
  runAws([
    "--profile",
    profile,
    "cloudfront",
    "create-invalidation",
    "--distribution-id",
    distributionId,
    "--paths",
    invalidatePath,
  ]);
} else {
  console.log("Usage: node scripts/deploy.js [s3|check|invalidate|deploy]");
}
