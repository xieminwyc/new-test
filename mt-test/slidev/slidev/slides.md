---
# theme: shibainu
theme: seriph
background: https://cover.sli.dev
title: 分享
info: false
class: my-page
transition: slide-left
mdc: true
overviewSnapshots: true
hideInToc: true

fonts:
  # 基础字体
  sans: Robot
  # 与 UnoCSS 的 `font-serif` css 类一同使用
  serif: Robot Slab
  # 用于代码块、内联代码等
  mono: Fira Code
---

<style>
.my-page {
  overflow-y: auto;
}
.my-page::-webkit-scrollbar {
  display: none;
}
</style>

# Slidev

## [Slidev](https://cn.sli.dev/guide/)

<Toc columns="3" />

<!-- prettier-ignore-start -->

---
layout: center
class: "testx"
background:./public/freImage1.jpeg

---
<!-- prettier-ignore-end -->


# Slidev

##This is the cover page.

<!-- 组件用法:
     以下内容在第一步动画后才可见 -->

<v-click> Hello World! </v-click>

<!-- 指令用法:
     以下内容在第二步动画后才可见 -->

## <div v-click class="text-xl"> Hey! </div>


<!-- prettier-ignore-start -->

---
hideInToc: true

---
<!-- prettier-ignore-end -->

# Page 2

This is a page with the layout `center` and a background image.

## transition: fade-out

# What is Slidev?

Slidev is a slides maker and presenter designed for developers, consist of the following features

- 📝 **Text-based** - focus on the content with Markdown, and then style them later
- 🎨 **Themable** - themes can be shared and re-used as npm packages
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion
- 🤹 **Interactive** - embed Vue components to enhance your expressions
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export to PDF, PPTX, PNGs, or even a hostable SPA
- 🛠 **Hackable** - virtually anything that's possible on a webpage is possible in Slidev
  <br>
  <br>

Read more about [Why Slidev?](https://sli.dev/guide/why)

---

# Page 3

This is a default page without any additional metadata.

```ts {2-3}
function add(a: Ref<number> | number, b: Ref<number> | number) {
  return computed(() => unref(a) + unref(b))
}
```

```ts
console.log('12354')
```

---

# This is Red

<style>
h1 {
  color: red
}
</style>

---

# Slidev

<!-- 这不是一条备注，因为它在幻灯片内容前 -->

Add `{monaco}` to the code block to turn it into an editor:

```ts {monaco}
import { ref } from 'vue'
import { emptyArray } from './external'

const arr = ref(emptyArray(10))
```

> Hello `world`

<style>
blockquote {
  code {
    @apply text-teal-500 dark:text-teal-400;
  }
}
</style>
<!-- 这是备注 -->

---

layout: two-cols

---

<template v-slot:default>

# Left

This shows on the left

</template>
<template v-slot:right>

# Right

This shows on the right

</template>

---

# Clicks Animations

You can add `v-click` to elements to add a click animation.

<div>

This shows up when you click the slide:

```html
<div v-click>This shows up when you click the slide.</div>
```

</div>

<br>

<v-click>

The <span v-mark.red="3"><code>v-mark</code> directive</span>
also allows you to add
<span v-mark.circle.orange="4">inline marks</span>
, powered by [Rough Notation](https://roughnotation.com/):

```html
<span v-mark.underline.orange>inline markers</span>
```

</v-click>

<div mt-20 v-click>

[Learn more](https://sli.dev/guide/animations#click-animation)

</div>

---

# Motions

Motion animations are powered by [@vueuse/motion](https://motion.vueuse.org/), triggered by `v-motion` directive.

```html
<div
  v-motion
  :initial="{ x: -80 }"
  :enter="{ x: 0 }"
  :click-3="{ x: 80 }"
  :leave="{ x: 1000 }"
>
  Slidev
</div>
```

<div class="w-60 relative">
  <div class="relative w-40 h-40">
    <img
      v-motion
      :initial="{ x: 800, y: -100, scale: 1.5, rotate: -50 }"
      :enter="final"
      class="absolute inset-0"
      src="https://sli.dev/logo-square.png"
      alt=""
    />
    <img
      v-motion
      :initial="{ y: 500, x: -100, scale: 2 }"
      :enter="final"
      class="absolute inset-0"
      src="https://sli.dev/logo-circle.png"
      alt=""
    />
    <img
      v-motion
      :initial="{ x: 600, y: 400, scale: 2, rotate: 100 }"
      :enter="final"
      class="absolute inset-0"
      src="https://sli.dev/logo-triangle.png"
      alt=""
    />
  </div>

  <div
    class="text-5xl absolute top-14 left-40 text-[#2B90B6] -z-1"
    v-motion
    :initial="{ x: -80, opacity: 0}"
    :enter="{ x: 0, opacity: 1, transition: { delay: 2000, duration: 1000 } }">
    Slidev
  </div>
</div>

<!-- vue script setup scripts can be directly used in markdown, and will only affects current page -->
<script setup lang="ts">
const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2
  }
}
</script>

<div
  v-motion
  :initial="{ x:35, y: 30, opacity: 0}"
  :enter="{ y: 0, opacity: 1, transition: { delay: 3500 } }">

[Learn more](https://sli.dev/guide/animations.html#motion)

</div>

---

# Themes

Slidev comes with powerful theming support. Themes can provide styles, layouts, components, or even configurations for tools. Switching between themes by just **one edit** in your frontmatter:

<div grid="~ cols-2 gap-2" m="t-2">

<div>left</div>
<div>right</div>

```yaml
---
theme: default
---
```

```yaml
---
theme: seriph
---
```

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-default/01.png?raw=true" alt="">

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-seriph/01.png?raw=true" alt="">

</div>

Read more about [How to use a theme](https://sli.dev/guide/theme-addon#use-theme) and
check out the [Awesome Themes Gallery](https://sli.dev/resources/theme-gallery).

---

Add `{monaco}` to the code block to turn it into an editor:

```ts {monaco}
import { ref } from 'vue'
import { emptyArray } from './external'

const arr = ref(emptyArray(10))
```

<div v-click> 1 步动画后显示 </div>
<v-click at="+2"><div> 3 步动画后显示 </div></v-click>
<div v-click.hide="'-1'"> 2 步动画后隐藏 </div>
<v-clicks>

- Item 1
- Item 2
- Item 3

</v-clicks>
<!-- 组件用法:
     以下内容在第一步动画后才可见 -->

<v-click> Hello World! </v-click>

<!-- 指令用法:
     以下内容在第二步动画后才可见 -->

## <div v-click class="text-xl"> Hey! </div>

---

# API

| zx         | nodejs                                                                                                                            | 说明                            |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `$`        | `child_process 模块(spawn)`                                                                                                       | 执行命令                        |
| `cd`       | 没有类似 cd 的便捷函数，但可以使用 [process.chdir](https://nodejs.cn/api/process/process_chdir_directory.html) 来更改当前工作目录 | 切换脚本运行的工作目录          |
| `fetch`    | [node-fetch-native](https://github.com/unjs/node-fetch-native)第三方                                                              | 发送网络请求                    |
| `question` | [readline](https://nodejs.cn/api/readline.html)🌟推荐[@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts)         | 询问用户输入                    |
| `sleep`    | -                                                                                                                                 | setTimeout 函数封装             |
| `echo`     | `console.log`                                                                                                                     | 打印信息 console.log() 替代方案 |

---

# 修改package

- 修改`package.json`

- 修改 type、bin、main 字段

<<< @/package.json

<!-- prettier-ignore-start -->

---
hideInToc: true

---
<!-- prettier-ignore-end -->

# 隐藏的

---

# 使用clone 模板

<<< D:/test/main.js#zx-clone

<!-- prettier-ignore-start -->

---
src: ./README.md
---

<!-- prettier-ignore-end -->
