run:
	npm run start

setup-android:
	npm install @capacitor/android
	npx cap add android

run-android:
	npm run build
	npx cap sync android
	npx cap copy android
	npx cap open android
	
run-ios:
	npm run build
	npx cap copy ios
	npx cap sync
	npx cap open ios
	
device:
	npm run build
	npx cap copy ios
	npx cap copy android
	
deploy:
	npm run build
	npx cap copy android
	bundle exec fastlane android deploy_debug_apk
	git add --all
	git commit -m "deploy(app): new android version"
	git push origin master

config:
	curl https://releases.hashicorp.com/consul-template/0.25.0/consul-template_0.25.0_linux_amd64.zip -o consul-template.zip
	unzip consul-template.zip
	ENVIRONMENT=$(e) consul-template -log-level info -once -config "./consul/config.hcl" -consul-addr https://consul.tools.cencox.xyz -consul-token $(t)
	rm -f consul-template
	rm -f consul-template.zip
	rm -f consul-template.pid