resource "aws_s3_bucket" "bucket" {
	bucket = "topstitch-${terraform.workspace}"
	acl = "public-read"
}