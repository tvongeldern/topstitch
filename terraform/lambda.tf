# resource "aws_lambda_function" "cognito_pre_signup_trigger" {
#   filename      = ".build/cognito_pre_signup.zip"
#   function_name = "topstitch_${terraform.workspace}_lambda_cognito_pre_signup"
#   role          = aws_iam_role.iam_for_lambda.arn
#   handler       = "index.handler"

#   source_code_hash = filebase64sha256(".build/cognito_pre_signup.zip")

#   runtime = "nodejs12.x"
# }
