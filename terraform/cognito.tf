# Cognito instance for the environment
resource "aws_cognito_user_pool" "cognito" {
  name = "topstitch_${terraform.workspace}_cognito"
	password_policy {
		minimum_length = 8
		require_lowercase = false
		require_numbers = false
		require_symbols = false
		require_uppercase = false
	}
	username_configuration {
		case_sensitive = false
	}
	auto_verified_attributes = ["email"]
	mfa_configuration          = "OFF"
	lambda_config {
		pre_sign_up = aws_lambda_function.cognito_pre_signup_trigger.arn
	}
}

resource "aws_cognito_user_pool_client" "web" {
  name = "web"

  user_pool_id = aws_cognito_user_pool.cognito.id
}