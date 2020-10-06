const config = {
  "import/default": ["error"],
  "import/export": ["error"],
  "import/group-exports": ["error"],
  "import/named": ["error"],
  "import/namespace": ["error"],
  "import/no-unresolved": ["error", { ignore: ["unpkg"] }],
  "import/no-named-as-default": ["error"],
  "import/no-named-as-default-member": ["error"],
  "import/no-duplicates": ["error"]
};

module.exports = config;
