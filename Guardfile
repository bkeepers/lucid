guard 'coffeescript', :output => 'lib' do
  watch(%r{^src/(.*)\.coffee})
end

guard 'coffeescript', :output => 'spec/javascripts' do
  watch(%r{^spec/coffeescripts/(.*)\.coffee})
end

guard 'livereload', :apply_js_live => false do
  watch(%r{^spec/javascripts/.+\.js$})
  watch(%r{^lib/.+\.js$})
end