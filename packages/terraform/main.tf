# Configure the AWS Provider
provider "aws" {
  version = "~> 2.59"
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
  region  = var.aws_default_region
}

locals {
  db_name = "mono"
}
