resource "aws_iam_role_policy" "build_policy" {
	role = aws_iam_role.iam_for_codebuild.name

	policy = jsonencode({
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Resource": [
					"*"
				],
				"Action": [
					"logs:CreateLogGroup",
					"logs:CreateLogStream",
					"logs:PutLogEvents"
				]
			},
			{
				"Effect": "Allow",
				"Action": [
					"ec2:CreateNetworkInterface",
					"ec2:DescribeDhcpOptions",
					"ec2:DescribeNetworkInterfaces",
					"ec2:DeleteNetworkInterface",
					"ec2:DescribeSubnets",
					"ec2:DescribeSecurityGroups",
					"ec2:DescribeVpcs"
				],
				"Resource": "*"
			},
		]
	})
}