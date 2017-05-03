---
title: How to comment in React JSX
author: Marcelo Carmona
layout: post
permalink: /comments-react-jsx/
path: 2016-10-06-how-to-comment-in-react-jsx.md
tags:
- React
- Javascript
---

La manera de hacer comentarios en react es un poco rara y cuando se busca información de cómo se hace es un poco dificil de encontrar.
No se puede usar comentarios HTML adéntro de JSX

```javascript
render() {
  return (
    <div>
      <!-- Esto no funciona -->
    </div>
  )
}
```

Es necesario usar comentarios en Javascript pero para eso vamos a necesitar usar las llaves de la siguiente manera:

```javascript
{/* Un comentario JSX */}
```
Y en Multilinea:
```javascript
{/* 
    Un comentario JSX
    en muchas
    líneas
*/}
```
