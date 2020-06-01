resource "aws_iam_role" "iam_for_lambda" {
  name = "IAMforTopstitchLambda-${terraform.workspace}"

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

resource "aws_lambda_permission" "cognito" {
	statement_id = "AllowExecutionFromCognito"
	action = "lambda:InvokeFunction"
	function_name = aws_lambda_function.cognito_pre_signup_trigger.function_name
	principal = "cognito-idp.amazonaws.com"
	source_arn = aws_cognito_user_pool.cognito.arn
}
