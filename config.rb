###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def code_block(path)
    "#{partial path}<pre><code class=\"language-html\">#{escape_html(partial(path))}</code></pre>"
  end
end

activate :external_pipeline,
  name: :webpack,
  command: build? ? 'node ./node_modules/webpack/bin/webpack.js --bail' : 'node ./node_modules/webpack/bin/webpack.js --watch -d',
  source: ".tmp/dist",
  latency: 1

# Build-specific configuration
configure :build do
	ignore 'javascripts/source/app/*'
  activate :minify_css
 #activate :minify_javascript
  activate :relative_assets
end

# AutoPrefixer Config
activate :autoprefixer
