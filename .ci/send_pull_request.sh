#!/bin/sh

setup_git() {
    set -e
    eval "$(ssh-agent -s)"
    openssl aes-256-cbc -K $encrypted_bd61809adafc_key -iv $encrypted_bd61809adafc_iv -in lime-app.enc -out ~\/lime-app -d
    chmod 600 lime-app
    ssh-add lime-app
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

get_repo(){
    git clone git@github.com:libremesh/lime-packages.git --branch master --depth 1 lime-packages
    cd lime-packages
}

create_file() {
    export HASH= sha256sum $TRAVIS_BUILD_DIR/lime-app-$TRAVIS_BRANCH.tar.gz
    cat ../Makefile.temp | sed -e "s/\${i}/1/" \
        | sed -e "s/\${version}/$HASH/" \
        | sed -e "s/\${hash}/$TRAVIS_BRANCH/"  >> packages/lime-app/Makefile
}

commit_file() {
  git checkout -b lime-app-$TRAVIS_BRANCH
  git commit -am "LimeApp updated to $TRAVIS_BRANCH"
}

push_changes(){
    git push --quiet lime-app-$TRAVIS_BRANCH
}

cd .ci
setup_git
get_repo
create_file
commit_file
push_changes
