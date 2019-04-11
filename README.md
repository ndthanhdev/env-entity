# env-entity [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A typescript lib leveraging decorator to create objects contain env vars

# Usage

```typescript
@EnvEntity()
class Env {
  @EnvProp('FOO')
  foo: number

  @EnvProp('BAR')
  bar: string
}

const env = getEnvEntity(Env)
```

## Base path

```typescript
@EnvEntity('FOO_')
class Env {
  @EnvProp('BAR')
  bar: string
}
env.bar === process.env.FOO_BAR
```

## Parsing

```typescript
@EnvEntity()
class Env {
  @EnvProp('NUM')
  num: number // process.env.NUM=123

  @EnvProp('STR')
  str: string // process.env.STR="string"

  @EnvProp('DATE')
  date: Date // process.env.DATE="2019-01-01"

  @EnvProp('ARR')
  arr: [] // process.env.ARR="[1,\"2\",3]"
}
```

# Roadmap

- Validating using [Joi](https://www.npmjs.com/package/joi)
- Default values
  When env vars can't parse or validate they will be set default values instead of throw errors.
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
```
