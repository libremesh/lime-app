# Publish LimeApp Release

This is a mini tutorial explaining what is the actual way to create a LimeApp release. On the future this should be 
improved and automated.

Is important that a certain version of LimeApp will work only with a certain version of lime packages. So is important
to know which version of LimeApp is compatible with which version of Lime packages.

Checklist:

- [ ] Check translations state
- [ ] Check release PR's state
- [ ] Create new release version
- [ ] Modify the changelog if needed
- [ ] Push the new release version
- [ ] Publish built package
- [ ] Update lime packages lime app makefile

## 1. Check translations state

Check if all translations are up-to-date. If not, update them using a PR.

```bash
npm run translations:extract
```

After run this command a report will be shown with the missing translations. If needed, open the `i18n` file and search
for `""` (empty strings) to add translations. Then commit and run:

```bash
npm run translations:compile
```

This will ensure that the translations can be built. 

## 2. Create new release version

To create the new release version first ensure all the PR's from this version are merged on develop and local repo is 
updated.

To create the new release just run:

```bash
npm run release
```

This will create a `CHANGELOG.md` file with the new version and the changes. Check if the changes are correct and then
commit the changes using `--amend`. It also modifies metadata on `package.json` and `package-lock.json` with the new 
version and create a new tag.

Then push the changes to the repository (you will need permissions):

```bash
git push --follow-tags origin f/release-candidate
```

## 3. Build the package and publish it

Build the package locally, change the command with the proper version:

```bash
version=$(git describe) # If you are on the correct commit run this to automate the version
npm run build:production
tar -cvzf lime-app-$version.tar.gz build
# Store the sha256sum for later
sha256sum lime-app-$version.tar.gz
```

Last command will show a hash, store it for use it later when updating lime packages Makefile

Then, go to https://github.com/libremesh/lime-app/releases/, draft a new release and publish the new package. 
After everything is ready, publish the drafted release.

## 4. Update lime packages lime app makefile

On lime packages create a PR similar to this one:

https://github.com/libremesh/lime-packages/pull/918/files.

The important areas are the `PKG_VERSION` and `PKG_HASH` variables. 



