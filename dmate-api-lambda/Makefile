.PHONY: build clean

build: clean
	venv/bin/pip install --target build/requirements -r requirements_prod.txt
	zip -g ./build/package.zip ./*.py
	cd build/requirements && zip -r ../package.zip .

deploy: build
	aws lambda update-function-code --function-name dmate-api --zip-file fileb://build/package.zip

logs:
	aws logs tail /aws/lambda/dmate-api --format short

clean:
	rm -rf ./build/*

test:
	python -m pytest
