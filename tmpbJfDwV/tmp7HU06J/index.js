import { PluginCreator, Root, Rule } from 'postcss';

const postcssRtlTranslate = () => {
  return {
    postcssPlugin: 'postcss-rtl-translate',
    Once(root) {
      root.walkRules((rule) => {
        // Check if the rule has a class selector that includes a translate-x utility
        if (rule.selector.includes('translate-x')) {
          rule.walkDecls('--tw-translate-x', () => {
            // Clone the rule to create an RTL-specific version
            const rtlRule = rule.cloneBefore();
            const ltrRule = rule.cloneBefore();

            // Update the selector to target RTL only
            rtlRule.selectors = rtlRule.selectors.map(
              selector => `[dir="rtl"] ${selector}`
            );

            // Modify only the --tw-translate-x declaration
            rtlRule.walkDecls('--tw-translate-x', rtlDecl => {
              rtlDecl.value = `calc(${rtlDecl.value} * -1)`;
            });

            // Remove all other declarations to ensure only the necessary changes are made
            rtlRule.walkDecls(rtlDecl => {
              if (rtlDecl.prop !== '--tw-translate-x') {
                rtlDecl.remove();
              }
            });

            // Update the selector to target LTR only
            ltrRule.selectors = ltrRule.selectors.map(
              selector => `[dir="ltr"] ${selector}`
            );

            // Modify only the --tw-translate-x declaration
            ltrRule.walkDecls('--tw-translate-x', rtlDecl => {
              rtlDecl.value = rtlDecl.value;
            });

            // Remove all other declarations to ensure only the necessary changes are made
            ltrRule.walkDecls(rtlDecl => {
              if (rtlDecl.prop !== '--tw-translate-x') {
                rtlDecl.remove();
              }
            });

            // Remove the --tw-translate-x declaration from the original rule
            rule.walkDecls('--tw-translate-x', decl => {
              decl.remove();
            });
          });
        }
      });
    },
  };
};

postcssRtlTranslate.postcss = true;

module.exports = postcssRtlTranslate;
