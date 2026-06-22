# 字体文件

将应用所需的自定义字体文件放置在此目录下。

## 支持的字体格式：
- TrueType Font (.ttf)
- OpenType Font (.otf)

## 使用步骤：

### iOS:
1. 将字体文件复制到 `ios/AwesomeProject/` 目录下
2. 在 `Info.plist` 中添加 `Fonts provided by application` 数组
3. 添加字体文件名到数组中

### Android:
1. 将字体文件复制到 `android/app/src/main/assets/fonts/` 目录下
2. 直接在代码中使用字体名称（不带扩展名）

## 示例：
```
fonts/
├── Roboto-Regular.ttf
├── Roboto-Bold.ttf
└── CustomFont.otf
```

## 在代码中使用：
```typescript
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
  },
});
```
