# env-entity [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A typescript lib leveraging decorator to create objects contain env vars

# Usage

```typescript
@EnvEntity()
class Env {
  @Prop('FOO')
  foo: number

  @Prop('BAR')
  bar: string
}

const env = getEnvEntity(Env)
```

## Base path

```typescript
@EnvEntity('FOO_')
class Env {
  @Prop('BAR')
  bar: string
}
env.bar === process.env.FOO_BAR
```

## Parsing

```typescript
@EnvEntity()
class Env {
  // process.env.NUM=123
  @Prop('NUM')
  num: number

  // process.env.STR="string"
  @Prop('STR')
  str: string

  // process.env.DATE="2019-01-01"
  @Prop('DATE')
  date: Date

  // process.env.ARR="[1,\"2\",3]"
  @Prop('ARR')
  arr: []
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
  @Prop('FOO')
  foo: string
}
@EnvEntity
class BAR {
  @Prop('BAR')
  bar: string
  foo: FOO
}
```
