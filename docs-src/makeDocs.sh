rm -rf ../docs/*;
echo "tpelements.com" > ../docs/CNAME
# node --inspect-brk ../node_modules/docco-next/bin/docco \
../node_modules/docco-next/bin/docco \
  -p ./plugin.js\
  -c tpe.css\
  -t tpe.ejs\
  -o ../docs\
 index.md\
 quickstart-designers.md\
 tutorials-designers.md\
 tutorials-designers/*\
 quickstart-developers.md\
 tutorials-developers.md\
 tutorials-developers/*\
 elements.md\
 elements/ee*.js\
 elements/en*.js\
 elements/nn*.js\
 mixins.md\
 mixins/*.js\
 appendices.md\
 appendices/*.md\
 material-theme.md
cp -r ./images ../docs/
