.PHONY: build clean

build:
	venv/bin/pip install --target build/requirements -r requirements.txt
	zip -g ./build/package.zip ./lambda_function.py
	cd build/requirements && zip -r ../package.zip .

clean:
	rm -rf ./build/*
