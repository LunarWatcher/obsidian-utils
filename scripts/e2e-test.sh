#!/usr/bin/bash

git_root=$(git rev-parse --show-toplevel)


cd ${git_root}
${git_root}/scripts/bundle.sh
cd ${git_root}/integration-test

if [ ! -d env ]; then
    python3 -m venv env
fi

if [[ "$1" == "false" ]]; then
    XVFB_CMD=
    shift
else
    XVFB_CMD="xvfb-run"
fi

source ./env/bin/activate
pip3 install -r requirements.txt

export WEBDRIVER_VERSION=$("${git_root}/scripts/get-webdriver-version.sh")
echo "Running with webdriver version $WEBDRIVER_VERSION"
$XVFB_CMD python3 -m pytest -v $@
