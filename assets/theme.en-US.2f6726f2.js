import{_ as f,d as g,u as k,r as p,o as m,c as b,w as t,e,a as c,b as s,m as h}from"./index.1285360b.js";const x=g({name:"ArcoMain",components:{},setup(){const{locale:a}=k(),n={meta:{type:"Developer Guide"},title:"Custom theme",description:"ArcoVue provides a set of blue themes (ArcoBlue), users can customize new themes according to their own needs to meet the diverse needs of business and brand."},o=(l,i)=>a.value==="zh-CN"?l:i;return{locale:a,data:n,changelog:typeof _changelog=="undefined"?void 0:_changelog,getMessage:o}}});function y(a,n,o,d,l,i){const r=p("anchor-head"),u=p("arco-article");return m(),b(u,h(a.data,{changelog:a.changelog}),{default:t(()=>[n[2]||(n[2]=e("p",null,[e("em",null,"Auto translate by google.")],-1)),n[3]||(n[3]=e("p",null,"ArcoDesign defines a set of default particle variables, and the theme can be customized by modifying and covering the particle variables.",-1)),c(r,{level:"2",href:"Less-variable-substitution"},{default:t(()=>n[0]||(n[0]=[s("Less variable substitution")])),_:1}),n[4]||(n[4]=e("p",null,[s("ArcoDesign uses "),e("a",{class:"link",href:"http://lesscss.org/",target:"_blank"},"Less"),s(" as a pre-compiled language. Through the "),e("strong",null,"modifyVars"),s(" function of Less, you can easily customize the style particle variables.")],-1)),n[5]||(n[5]=e("p",null,[s("Global variables can be found in "),e("code",null,"global.less (@arco-design/web-vue/es/style/theme/global.less)"),s(".")],-1)),n[6]||(n[6]=e("p",null,[s("In the component library, we have made a very detailed extraction of component style variables, which can meet the fine-grained customization of components. For example, the style variable "),e("code",null,"token.less (@arco-design/web-vue/es/button/style/token.less)"),s(" list corresponding to the "),e("code",null,"Button"),s(" component.")],-1)),n[7]||(n[7]=e("h3",{id:"Import component library style files"},"Import component library style files",-1)),n[8]||(n[8]=e("p",null,[s("If you want to customize the theme, you need to import less style files. The component library less style files can be found in "),e("code",null,"@arco-design/web-vue/dist/arco.less"),s(" or "),e("code",null,"@arco-design/web-vue/es/index.less"),s("."),e("br"),s("If you use the on-demand loading method to import components, make sure to enable the import of less style files in the on-demand loading plugin.")],-1)),n[9]||(n[9]=e("h3",{id:"Vite Configuration"},"Vite Configuration",-1)),n[10]||(n[10]=e("p",null,[s("Vite itself supports "),e("a",{class:"link",href:"https://vitejs.dev/guide/features.html#css-pre-processors",target:"_blank"},"Less syntax"),s(", users only need to pass in the Less configuration in the configuration file:")],-1)),n[11]||(n[11]=e("pre",{class:"code-content"},[e("code",{class:"language-lang"},[s(`// vite.config.js
export default {
`),e("span",{class:"token unchanged"},[e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},` css: {
`)]),e("span",{class:"token inserted-sign inserted"},[e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`   preprocessorOptions: {
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`     less: {
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`       modifyVars: {
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`         'arcoblue-6': '#f85959',
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`       },
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`       javascriptEnabled: true,
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`     }
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`   }
`)]),e("span",{class:"token unchanged"},[e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},` },
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},` ...
`)]),s(`}
`)])],-1)),n[12]||(n[12]=e("h3",{id:"Webpack Configuration"},"Webpack Configuration",-1)),n[13]||(n[13]=e("p",null,[s("When Webpack is packaged, through modifyVars of "),e("a",{class:"link",href:"https://github.com/webpack-contrib/less-loader"},"less-loader"),s(", all variables can be replaced:")],-1)),n[14]||(n[14]=e("pre",{class:"code-content"},[e("code",{class:"language-lang"},[s(`// webpack.config.js
module.exports = {
`),e("span",{class:"token unchanged"},[e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},` rules: [{
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`   test: /\\.less$/,
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`   use: [{
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`     loader: 'style-loader',
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`   }, {
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`     loader: 'css-loader',
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`   }, {
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`     loader: 'less-loader',
`)]),e("span",{class:"token inserted-sign inserted"},[e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`     options: {
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`       lessOptions: {
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`         modifyVars: {
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`           'arcoblue-6': '#f85959',
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`         },
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`         javascriptEnabled: true,
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`       },
`),e("span",{class:"token prefix inserted"},"+"),e("span",{class:"token line"},`     },
`)]),e("span",{class:"token unchanged"},[e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`   }],
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},`   ...
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},` }],
`),e("span",{class:"token prefix unchanged"}," "),e("span",{class:"token line"},` ...
`)]),s(`}
`)])],-1)),c(r,{level:"2",href:"Design-System-Lab-theme-package-usage"},{default:t(()=>n[1]||(n[1]=[s("Design System Lab theme package usage")])),_:1}),n[15]||(n[15]=e("p",null,"The theme package for the style configuration platform Vue is already available.",-1)),n[16]||(n[16]=e("p",null,[s("For specific usage, please refer to "),e("a",{class:"link",href:"https://arco.design/docs/designlab/guideline"},"Style Configuration Platform Documentation")],-1))]),_:1},16,["changelog"])}var w=f(x,[["render",y]]);export{w as default};
