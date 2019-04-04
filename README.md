# env-object [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A typescript lib leveraging decorator to create objects contain env vars;

# Usage

```typescript
@EnvObject
class Env {
  @EnvProp('FOO')
  foo: string

  @EnvProp('BAR')
  bar: string
}

const env = getEnvObject(Env)
env.foo === process.env.FOO // true
```

# Roadmap

- Deep path.

```typescript
@EnvObject
class Env {
  @EnvProp('FOO.BAR')
  foo: number
}
```

- Type checking

```typescript
@EnvObject
class Env {
  @EnvProp('FOO')
  foo: number
}
process.env.foo = 'abc' // NaN
getEnvObject(Env) // throw error
```

- Base path

```typescript
@EnvObject('FOO')
class Env {
  @EnvProp('BAR')
  bar: string
}
env.bar === process.env.FOO.BAR // true
```

- Nested EnvObject

```typescript
@EnvObject
class FOO {
  @EnvProp('FOO')
  foo: string
}
@EnvObject
class BAR {
  @EnvProp('BAR')
  bar: string
  foo: FOO
}
env.foo.foo === process.env.FOO // true
```
