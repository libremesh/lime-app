# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.22](https://github.com/germanferrero/lime-app/compare/v0.2.21...v0.2.22) (2022-02-21)

* **pirania:** add portuguese translations ([63476a2](https://github.com/germanferrero/lime-app/commit/d005012fb9925c849591c7051c3150f9263ebeba))

### [0.2.21](https://github.com/germanferrero/lime-app/compare/v0.2.20...v0.2.21) (2022-02-21)


### Features

* **hotspot:** add hotspot feature ([6f0355f](https://github.com/germanferrero/lime-app/commit/6f0355fc4af7f6a55198bed58d5957ff14ce7e02))
* **node admin:** add Roaming AP config ([31c65d1](https://github.com/germanferrero/lime-app/commit/31c65d19389bfa237245db7de3b5467bc9364172))
* **node-admin:** allow changing wifi password ([12d8492](https://github.com/germanferrero/lime-app/commit/12d849275cbed31dd885c156ebe629b693062b39))
* **pirania:** adds interface for pirania based on new-pirania-api ([63476a2](https://github.com/germanferrero/lime-app/commit/63476a2561eed8e7531faba5a4699622cf363c3c))
* pirania ui ([353ffd9](https://github.com/germanferrero/lime-app/commit/353ffd90ac946815fc30cc09ae5e658f7ef874af))
* **portal editor:** add portal editor ([d95d4fb](https://github.com/germanferrero/lime-app/commit/d95d4fb993dd8601a43d0854ccc8a1d0b63cf291))


### Bug Fixes

* **getvoices:** fix synth voices crash in align screen ([1ba18c4](https://github.com/germanferrero/lime-app/commit/1ba18c4e0a0154a9568ae6e6a4d73e570f940c98))

### [0.2.20](https://github.com/germanferrero/lime-app/compare/v0.2.19...v0.2.20) (2021-05-11)

* **map:** prevent buttons overflow in mobile
* **align:** show message "no mesh interfaces available" when there aren't
### [0.2.19](https://github.com/germanferrero/lime-app/compare/v0.2.18...v0.2.19) (2021-05-11)


### Bug Fixes

* **firmware:** disable upgrade button after submit ([aaea467](https://github.com/germanferrero/lime-app/commit/aaea4670f064fbb07c6f35bc4ac5d47a6826a1cd))

### [0.2.18](https://github.com/germanferrero/lime-app/compare/v0.2.17...v0.2.18) (2021-05-11)


### Bug Fixes

* **firmware:** show loading spinner while uploading file ([ea4293c](https://github.com/germanferrero/lime-app/commit/ea4293cbabf1d0c757114e441d2084518e00e3d6))

### [0.2.17](https://github.com/germanferrero/lime-app/compare/v0.2.16...v0.2.17) (2021-05-06)


### Features

* **translations:**  add a lot of pt-br translations :)
* **menu:** add community / node view to menu (currently without community features) ([09fcec8](https://github.com/germanferrero/lime-app/commit/09fcec8e5872e27e6adfad0ba1a6e23c14efdb2e))


### Bug Fixes

* **translations:** fix English counts ([8b3d0c4](https://github.com/germanferrero/lime-app/commit/8b3d0c4f0998f9b1e77ba2e085b6b8ef082c83e3))
* **translations:** fix English spelling ([a319694](https://github.com/germanferrero/lime-app/commit/a3196940452fa21de63c9928ee3017b4a1f60cd0))
* **translations:** force lowercase locale to I18n ([34e7b57](https://github.com/germanferrero/lime-app/commit/34e7b57a7dc6edf58f9ef769ff02f3dc0a64f32c))
* **translations:** spelling fixes for pt-br ([11d52b8](https://github.com/germanferrero/lime-app/commit/11d52b894dc9404c380622d74adf44b77fc1944f))
* **upgrade:** fix typo, now showing release link to more info ([14e6f89](https://github.com/germanferrero/lime-app/commit/14e6f89e81c15b41707b7cea0d13b180e0d0c8ff))

### [0.2.16](https://github.com/germanferrero/lime-app/compare/v0.2.15...v0.2.16) (2021-03-12)


### Bug Fixes

* **align:** url incremental growth at align-single ([3f92f6a](https://github.com/germanferrero/lime-app/commit/3f92f6a5079143c1b6478b0d1ab3483076d642db))
* **firmware:** fix firmware upgrade when eupgrade is missing ([f6683af](https://github.com/germanferrero/lime-app/commit/f6683af2a36c33a9d67a43824a46d8eb419667f1))
* **i18n:** fix localization fallback. Bring back some PT-br translations([4891d66](https://github.com/germanferrero/lime-app/commit/4891d666c810623980c36d6ee2dae32a6462a8d3))
* **remotesupport:** fix remotesupport broken ui when no internet ([a198536](https://github.com/germanferrero/lime-app/commit/a19853687e21aef94b3809ff4155e07a28a1f958))

### Improvements

* **changenode:** improve UI texts with more user-friendly ones ([cab16f3](https://github.com/libremesh/lime-app/commit/cab16f3bbcf54b30f906e065ac569810e8b509a1))
### [0.2.15](https://github.com/germanferrero/lime-app/compare/v0.2.14...v0.2.15) (2021-01-27)


### Bug Fixes

* **most_active:** fix rx page not loading when no most_active ([428f267](https://github.com/germanferrero/lime-app/commit/428f2670e8a89f6de7f1254129a23ce72988b37f))

### [0.2.14](https://github.com/germanferrero/lime-app/compare/v0.2.13...v0.2.14) (2021-01-27)

### Refactor
* **bathost:** adapt to new ubus endpoint

### [0.2.13](https://github.com/germanferrero/lime-app/compare/v0.2.12...v0.2.13) (2021-01-25)

### Features
* **remotesupport:** add support for sharing tmate sessions to your node ([#289](https://github.com/libremesh/lime-app/pull/289))

### Bug Fixes

* **map:** load community when this node is not in nodes_and_links db ([67140b3](https://github.com/germanferrero/lime-app/commit/67140b31efa34b8c3817b84a42d36cebeadab262))

### Improvements
* **map:** show links only when both nodes list each other as associated ([d195ac4](https://github.com/germanferrero/lime-app/commit/9038906ff7f3de5b6a4758e739705c3c7d195ac4))

### [0.2.12](https://github.com/germanferrero/lime-app/compare/v0.2.11...v0.2.12) (2021-01-15)
### Features
* **align** New align screen, check out more info at PR [#285](https://github.com/libremesh/lime-app/pull/285)

### [0.2.11](https://github.com/libremesh/lime-app/compare/v0.2.10...v0.2.11) (2020-11-27)


### Features

* **firstbootwizard:** add do not ask again option to fbw banner ([ed9b733](https://github.com/libremesh/lime-app/commit/ed9b73388fe610358f7db52ab2ebabdc3b0d8676))

* **firmware upgrade:** add one click firmware upgrade ([a62547d](https://github.com/libremesh/lime-app/commit/a62547d971438cf3197f40432708469b410eca94))

### Bug Fixes

* **firstbootwizard:** ask root privilege to run fbw ([4c5e52e](https://github.com/libremesh/lime-app/commit/4c5e52e7d25d2e146e8a973a7ca64fdb3e9f9961))

### [0.2.10](https://github.com/germanferrero/lime-app/compare/v0.2.9...v0.2.10) (2020-10-29)


### Bug Fixes

* **fbw:** fix app crash when lime-fbw is not available ([8993892](https://github.com/germanferrero/lime-app/commit/8993892334dbdd52c7804dda4d63ff22be4ef276))
* **fbw:** protect fbw with root password ([3930f1e](https://github.com/germanferrero/lime-app/commit/3930f1eb80caea0904cacbc755dba5e437f6832c))

### [0.2.9](https://github.com/germanferrero/lime-app/compare/v0.2.8...v0.2.9) (2020-09-16)

### [0.2.8](https://github.com/germanferrero/lime-app/compare/v0.2.7...v0.2.8) (2020-09-16)

### [0.2.6](https://github.com/germanferrero/lime-app/compare/v0.2.5...v0.2.6) (2020-09-15)


### Features

* **firmware upgrade:** basic implementation of firmware upgrade ([175ec82](https://github.com/germanferrero/lime-app/commit/175ec820aab261463c13318b30bc1ff687467bf4))


### Bug Fixes

* **fbw:** allow uppercase letters in network name ([987c458](https://github.com/germanferrero/lime-app/commit/987c4581d350e3cc75b2e467e1559748e870f2fc))
* **rx:** fix most_active change node functionality ([acc2617](https://github.com/germanferrero/lime-app/commit/acc26176da225501c6d02c8403bede54d270cefb))
* **rxpage:** fix uptime days field ([85e6b55](https://github.com/germanferrero/lime-app/commit/85e6b5562585c69652a08f2e828e57181cc543e1))
* **shared-password:** do not show success message on error ([3866041](https://github.com/germanferrero/lime-app/commit/38660416dbb6391b0e338c0f128e52dd57828bcd))

### [0.2.5](https://github.com/germanferrero/lime-app/compare/v0.2.4...v0.2.5) (2020-05-20)


### CI Changes

* **libremesh pull request** overwrite master Makefile, no template one ([eb4fe08](https://github.com/germanferrero/lime-app/commit/eb4fe08815af15f68fee222263bd151bff79744c))

### [0.2.4](https://github.com/germanferrero/lime-app/compare/v0.2.2...v0.2.4) (2020-05-20)


### Features

* **fbw:** add shared password to network creation form ([0e90457](https://github.com/germanferrero/lime-app/commit/0e90457f828e84264ded5568205925d57ef82918)), closes [#237](https://github.com/germanferrero/lime-app/issues/237)
* **plugin-network-admin:** add network admin plugin ([b40604c](https://github.com/germanferrero/lime-app/commit/b40604c1bae0ed8d65d1c01ddd63e8b791390d94))


### Bug Fixes

* **locate:** fix ui bugs related to undefined coordinates of nodes ([d6e90d5](https://github.com/germanferrero/lime-app/commit/d6e90d5f0bd2e205731836daf3312e29c9d391bc)), closes [#250](https://github.com/germanferrero/lime-app/issues/250)

### [0.2.3](https://github.com/libremesh/lime-app/compare/v0.2.2...v0.2.3) (2020-02-11)


### Bug Fixes

* **bug:** fix access from different node ([956b337](https://github.com/libremesh/lime-app/commit/956b337048b640062fdc975b74a74f605bbe0b52))

### [0.2.2](https://github.com/libremesh/lime-app/compare/v0.2.1...v0.2.2) (2020-01-29)


### Features

* **rxjs:** update to new api in epics and api files ([8500cc5](https://github.com/libremesh/lime-app/commit/8500cc5664834c73eb539d0b1ee8f3b1eb22b4d5))


### Bug Fixes

* **align:** fix setInterval and redux state ([a430c69](https://github.com/libremesh/lime-app/commit/a430c69152728dba60c324cea47dfc3225496f3c))
* **bug:** 10.5.0.1 as home address ([58f581d](https://github.com/libremesh/lime-app/commit/58f581da78a1479bc160c40cfeb5793fe138c34d))
* **intl:** fix int18n errors and add new translations ([c3dc4bb](https://github.com/libremesh/lime-app/commit/c3dc4bb425c5f49a4cfeb52c39416d56028e7268))
* **navigation:** avoid undefined elements ([1814c39](https://github.com/libremesh/lime-app/commit/1814c39ebe49edd3e1f817d7d9836632709772af))
* **timer:** fix uptime timer ([214f83a](https://github.com/libremesh/lime-app/commit/214f83a1a53eea704ddfed4f28eb87166d5c651e))
* **timer:** fix uptime timer ([21b3e2e](https://github.com/libremesh/lime-app/commit/21b3e2ed6a7b38b37a02e2b3f3db730c670bf73c))

### [0.2.1](https://github.com/libremesh/lime-app/compare/v0.2.0...v0.2.1) (2019-10-22)


### Bug Fixes

* **fbw:** community name in lowercase ([73d464e](https://github.com/libremesh/lime-app/commit/73d464e))
* **slugify:** improves domain usage ([0237be9](https://github.com/libremesh/lime-app/commit/0237be9))
* **validation:** fix hostname and communiy name validation in fbw ([436a258](https://github.com/libremesh/lime-app/commit/436a258))
* **validation:** fix hostname validation in adminPage ([13afd8c](https://github.com/libremesh/lime-app/commit/13afd8c))


### Features

* **redux:** add generic actions file ([fb4f173](https://github.com/libremesh/lime-app/commit/fb4f173))
* **validation:** hostname validation and slugify ([48cdd4e](https://github.com/libremesh/lime-app/commit/48cdd4e))

## [0.2.0](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.13...v0.2.0) (2019-10-08)


### Bug Fixes

* **config:** remove duplicated hostname ([0cd3ac9](https://github.com/libremesh/lime-app/commit/0cd3ac9)), closes [#207](https://github.com/libremesh/lime-app/issues/207)
* **redirect:** full redirect instead of change the api endopint ([5dd520e](https://github.com/libremesh/lime-app/commit/5dd520e))
* **redirect:** remove redirect on metrics page ([6639b64](https://github.com/libremesh/lime-app/commit/6639b64))
* **validation:** network and host name validation in FBW ([85755ef](https://github.com/libremesh/lime-app/commit/85755ef))

<a name="0.2.0-alpha.13"></a>
# [0.2.0-alpha.13](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.12...v0.2.0-alpha.13) (2019-06-25)


### Bug Fixes

* **metrics:** fix error messages on gateway error ([858bf02](https://github.com/libremesh/lime-app/commit/858bf02))


### Features

* **metrics:** change to new lime-metrics response ([7131d02](https://github.com/libremesh/lime-app/commit/7131d02))



<a name="0.2.0-alpha.12"></a>
# [0.2.0-alpha.12](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.11...v0.2.0-alpha.12) (2019-06-25)


### Bug Fixes

* **location:** catch error loading nodes links ([a255d9c](https://github.com/libremesh/lime-app/commit/a255d9c))
* **location:** fix comparation. Convert all values to number ([f47da3a](https://github.com/libremesh/lime-app/commit/f47da3a))
* **location:** fix geojson render ([6b90dc6](https://github.com/libremesh/lime-app/commit/6b90dc6))
* **location:** remove develop ip in meta/CONECTION_START event ([12c3a92](https://github.com/libremesh/lime-app/commit/12c3a92))
* **package:** update axios to version 0.19.0 ([27401f9](https://github.com/libremesh/lime-app/commit/27401f9))


### Features

* **location:** include hostname in point data ([f3c4ead](https://github.com/libremesh/lime-app/commit/f3c4ead))



<a name="0.2.0-alpha.6"></a>
# [0.2.0-alpha.6](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.5...v0.2.0-alpha.6) (2019-03-09)


### Bug Fixes

* change api error message ([033c5d9](https://github.com/libremesh/lime-app/commit/033c5d9)), closes [#113](https://github.com/libremesh/lime-app/issues/113)
* first boot wizard screen ([46069ef](https://github.com/libremesh/lime-app/commit/46069ef))
* metrics on gateway node ([3fead9f](https://github.com/libremesh/lime-app/commit/3fead9f)), closes [#112](https://github.com/libremesh/lime-app/issues/112)



<a name="0.2.0-alpha.5"></a>
# [0.2.0-alpha.5](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.3...v0.2.0-alpha.5) (2019-02-25)



<a name="0.2.0-alpha.4"></a>
# [0.2.0-alpha.4](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.3...v0.2.0-alpha.4) (2019-02-25)



<a name="0.2.0-alpha.3"></a>
# [0.2.0-alpha.3](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.0...v0.2.0-alpha.3) (2019-02-25)


### Bug Fixes

* **fbw:** change fbw api ([696fc98](https://github.com/libremesh/lime-app/commit/696fc98))
* **fbw:** remove groundrouting plugin and add fbw ([cb5711d](https://github.com/libremesh/lime-app/commit/cb5711d))
* **redux:** fbw catch must return an array ([b8d34e2](https://github.com/libremesh/lime-app/commit/b8d34e2))
* **redux-observable:** update epics to redux-ovservable 1.0 ([a8a9234](https://github.com/libremesh/lime-app/commit/a8a9234))


### Features

* **component:** add global banner component ([154568a](https://github.com/libremesh/lime-app/commit/154568a))
* **fbw:** add firstbootwizard page ([8157a0d](https://github.com/libremesh/lime-app/commit/8157a0d))
* **fbw:** init first boot wizard ([905b552](https://github.com/libremesh/lime-app/commit/905b552))



<a name="0.2.0-alpha.2"></a>
# [0.2.0-alpha.2](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.0...v0.2.0-alpha.2) (2019-02-25)


### Bug Fixes

* **fbw:** change fbw api ([696fc98](https://github.com/libremesh/lime-app/commit/696fc98))
* **fbw:** remove groundrouting plugin and add fbw ([cb5711d](https://github.com/libremesh/lime-app/commit/cb5711d))
* **redux:** fbw catch must return an array ([b8d34e2](https://github.com/libremesh/lime-app/commit/b8d34e2))
* **redux-observable:** update epics to redux-ovservable 1.0 ([a8a9234](https://github.com/libremesh/lime-app/commit/a8a9234))


### Features

* **component:** add global banner component ([154568a](https://github.com/libremesh/lime-app/commit/154568a))
* **fbw:** add firstbootwizard page ([8157a0d](https://github.com/libremesh/lime-app/commit/8157a0d))
* **fbw:** init first boot wizard ([905b552](https://github.com/libremesh/lime-app/commit/905b552))



<a name="0.2.0-alpha.1"></a>
# [0.2.0-alpha.1](https://github.com/libremesh/lime-app/compare/v0.2.0-alpha.0...v0.2.0-alpha.1) (2019-02-25)


### Bug Fixes

* **fbw:** change fbw api ([696fc98](https://github.com/libremesh/lime-app/commit/696fc98))
* **fbw:** remove groundrouting plugin and add fbw ([cb5711d](https://github.com/libremesh/lime-app/commit/cb5711d))
* **redux:** fbw catch must return an array ([b8d34e2](https://github.com/libremesh/lime-app/commit/b8d34e2))
* **redux-observable:** update epics to redux-ovservable 1.0 ([a8a9234](https://github.com/libremesh/lime-app/commit/a8a9234))


### Features

* **component:** add global banner component ([154568a](https://github.com/libremesh/lime-app/commit/154568a))
* **fbw:** add firstbootwizard page ([8157a0d](https://github.com/libremesh/lime-app/commit/8157a0d))
* **fbw:** init first boot wizard ([905b552](https://github.com/libremesh/lime-app/commit/905b552))



<a name="0.2.0-alpha.0"></a>
# [0.2.0-alpha.0](https://github.com/libremesh/lime-app/compare/v0.1.1-alpha.0...v0.2.0-alpha.0) (2018-10-24)


### Bug Fixes

* **location:** fix inverted value in default location ([6fac5dd](https://github.com/libremesh/lime-app/commit/6fac5dd))


### Features

* **align:** show message when no other node is found ([84a2c1b](https://github.com/libremesh/lime-app/commit/84a2c1b))



<a name="0.1.1-alpha.0"></a>
## [0.1.1-alpha.0](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.5...v0.1.1-alpha.0) (2018-10-23)


### Bug Fixes

* **husky:** update hooks in package.json ([87ac1ba](https://github.com/libremesh/lime-app/commit/87ac1ba))
* **path:** change default path to libremesh lime-app path ([53106c0](https://github.com/libremesh/lime-app/commit/53106c0))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.5...v0.1.0) (2018-10-23)


### Bug Fixes

* **husky:** update hooks in package.json ([87ac1ba](https://github.com/libremesh/lime-app/commit/87ac1ba))
* **path:** change default path to libremesh lime-app path ([53106c0](https://github.com/libremesh/lime-app/commit/53106c0))



<a name="0.1.0-alpha.5"></a>
# [0.1.0-alpha.5](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.4...v0.1.0-alpha.5) (2018-10-23)


### Bug Fixes

* **api:** fix api call ([00dc926](https://github.com/libremesh/lime-app/commit/00dc926))
* **cors:** fix cors connection ([13ef9b5](https://github.com/libremesh/lime-app/commit/13ef9b5))
* **groundrouting:** disable groundrouting plugin ([e792737](https://github.com/libremesh/lime-app/commit/e792737))
* **package:** update leaflet.gridlayer.googlemutant to version 0.7.0 ([5be94dd](https://github.com/libremesh/lime-app/commit/5be94dd))
* **package:** update redux-observable to version 0.19.0 ([a941dce](https://github.com/libremesh/lime-app/commit/a941dce))
* **package:** update redux-observable to version 1.0.0-beta.2 ([667aa46](https://github.com/libremesh/lime-app/commit/667aa46))
* **reducer:** fix wrong state variable ([49edbcb](https://github.com/libremesh/lime-app/commit/49edbcb))
* **redux:** use new redux-observable api ([f916d61](https://github.com/libremesh/lime-app/commit/f916d61))
* **transaltion:** fix metrics page transaltions ([07969ad](https://github.com/libremesh/lime-app/commit/07969ad))
* **translations:** remove preact-inline from status component ([7668701](https://github.com/libremesh/lime-app/commit/7668701))
* **url:** fix ground routing url in menu ([78a8263](https://github.com/libremesh/lime-app/commit/78a8263))


### Features

* **loading:** add loading in ground routing page ([1d92b0f](https://github.com/libremesh/lime-app/commit/1d92b0f))
* **location:** add new ubus-lime-location api ([a32622b](https://github.com/libremesh/lime-app/commit/a32622b))
* **location:** detect unassigned location in node ([e0678a9](https://github.com/libremesh/lime-app/commit/e0678a9))
* **plugin:** init ground routing script ([442e934](https://github.com/libremesh/lime-app/commit/442e934))
* **plugin:** register groundrouting plugin in config.js ([1688639](https://github.com/libremesh/lime-app/commit/1688639))



<a name="0.1.0-alpha.4"></a>
# [0.1.0-alpha.4](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.3...v0.1.0-alpha.4) (2018-02-06)



<a name="0.1.0-alpha.3"></a>
# [0.1.0-alpha.3](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2018-01-31)


### Bug Fixes

* Remove invalid code ([97518b5](https://github.com/libremesh/lime-app/commit/97518b5))



<a name="0.1.0-alpha.2"></a>
# [0.1.0-alpha.2](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2018-01-22)


### Bug Fixes

* **package:** update redux-observable to version 0.17.0 ([e5bafbc](https://github.com/libremesh/lime-app/commit/e5bafbc))
* Remove admin options form config page ([ccbe3ab](https://github.com/libremesh/lime-app/commit/ccbe3ab))


### Features

* Add admin section ([c416cc4](https://github.com/libremesh/lime-app/commit/c416cc4))
* Setup notifications ([6e5ce8c](https://github.com/libremesh/lime-app/commit/6e5ce8c))



<a name="0.1.0-alpha.1"></a>
# [0.1.0-alpha.1](https://github.com/libremesh/lime-app/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2017-11-24)



<a name="0.1.0-alpha.0"></a>
# [0.1.0-alpha.0](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.6...v0.1.0-alpha.0) (2017-11-24)


### Features

* **location:** Changes in how to select the new location of a node ([31fdabf](https://github.com/libremesh/lime-app/commit/31fdabf)), closes [#53](https://github.com/libremesh/lime-app/issues/53)
* **settings:** Metrics box and align status now respond to community settings ([dbc3c8d](https://github.com/libremesh/lime-app/commit/dbc3c8d)), closes [#28](https://github.com/libremesh/lime-app/issues/28)



<a name="0.0.1-alpha.6"></a>
## [0.0.1-alpha.6](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.4...v0.0.1-alpha.6) (2017-10-25)


### Bug Fixes

* **travis:** Remove on repo ([739deac](https://github.com/libremesh/lime-app/commit/739deac))
* **travis:** Skip cleanup after build ([3cec77a](https://github.com/libremesh/lime-app/commit/3cec77a))



<a name="0.0.1-alpha.5"></a>
## [0.0.1-alpha.5](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.4...v0.0.1-alpha.5) (2017-10-25)


### Bug Fixes

* **travis:** Skip cleanup after build ([3cec77a](https://github.com/libremesh/lime-app/commit/3cec77a))



<a name="0.0.1-alpha.4"></a>
## [0.0.1-alpha.4](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2017-10-25)


### Bug Fixes

* **travis:** Wrong credentials ([d9c14b4](https://github.com/libremesh/lime-app/commit/d9c14b4))



<a name="0.0.1-alpha.3"></a>
## [0.0.1-alpha.3](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2017-10-25)


### Bug Fixes

* **travis:** Use user and password instead of api key ([c451387](https://github.com/libremesh/lime-app/commit/c451387))



<a name="0.0.1-alpha.2"></a>
## [0.0.1-alpha.2](https://github.com/libremesh/lime-app/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2017-10-25)



<a name="0.0.1-alpha.1"></a>
## [0.0.1-alpha.1](https://github.com/libremesh/lime-app/compare/0.0.1-alpha1...0.0.1-alpha.1) (2017-10-25)


### Bug Fixes

* **package:** update redux-observable to version 0.15.0 ([2bb161b](https://github.com/libremesh/lime-app/commit/2bb161b))



<a name="0.0.1-alpha.0"></a>
## [0.0.1-alpha.0](https://github.com/libremesh/lime-app/compare/0.0.1-alpha1...0.0.1-alpha.0) (2017-10-25)


### Bug Fixes

* **package:** update redux-observable to version 0.15.0 ([2bb161b](https://github.com/libremesh/lime-app/commit/2bb161b))
