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
const name = "foo ";
await $`mkdir ${name}`;
