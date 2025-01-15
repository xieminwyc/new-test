// #!/usr/bin/env zx # 使脚本可执行

// #!/usr/bin/env zx # 使脚本可执行

import {
  $,
  fs,
  path,
  spinner,
  chalk,
  sleep,
  echo,
  glob,
  usePowerShell,
  quote,
} from "zx";

usePowerShell(); // Use PowerShell.exe
await $`pwd`;
// 初始化 Git 仓库
await $`git init`;
await $`git add .`;
await $`git commit -m "init: init project"`;
await $`git push`;
