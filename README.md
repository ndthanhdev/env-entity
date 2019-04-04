# env-entity [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A typescript lib leveraging decorator to create objects contain env vars;

# Usage

## Basic use case

```typescript
@EnvEntity()
class Env {
  @EnvProp('FOO')
  foo: string

  @EnvProp('BAR')
  bar: string
}

const env = getEnvEntity(Env)
env.foo === process.env.FOO // true
```

## Using with base path

```typescript
@EnvEntity('FOO_')
class Env {
  @EnvProp('BAR')
  bar: string
}
env.bar === process.env.FOO_BAR
```

# Roadmap

- Type checking

```typescript
@EnvEntity
class Env {
  @EnvProp('FOO')
  foo: number
}
process.env.foo = 'abc' // NaN
getEnvEntity(Env) // throw error
```

- Nested EnvEntity

```typescript
@EnvEntity
class FOO {
  @EnvProp('FOO')
  foo: string
}
@EnvEntity
class BAR {
  @EnvProp('BAR')
  bar: string
  foo: FOO
}
env.foo.foo === process.env.FOO // true
```
