.PHONY: build clean

build: clean
	venv/bin/pip install --target build/requirements -r requirements.txt
	zip -g ./build/package.zip ./lambda_function.py
	cd build/requirements && zip -r ../package.zip .

deploy: build
	aws lambda update-function-code --function-name datepal-api --zip-file fileb://build/package.zip

logs:
	aws logs tail /aws/lambda/datepal-api --format short

clean:
	rm -rf ./build/*
