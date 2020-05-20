resource "aws_iam_role" "iam_for_lambda" {
  name = "IAMforTopstitchLambda"

  assume_role_policy = jsonencode({
		"Version": "2012-10-17",
		"Statement": [
			{
				"Action": "sts:AssumeRole",
				"Principal": {
					"Service": "lambda.amazonaws.com"
				},
				"Effect": "Allow",
				"Sid": ""
			}
		]
	})
}

resource "aws_iam_role" "iam_for_codebuild" {
	name = "IAMforTopstitchBuild"

	assume_role_policy = jsonencode({
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Principal": {
					"Service": "codebuild.amazonaws.com"
				},
				"Action": "sts:AssumeRole"
			}
		]
	})
}