
# wcard-gen

A welcome card generator based on canvas, built for ease.

## Installation

Install wcard-gen with npm

```bash
  npm i wcard-gen
```

Install wcard-gen with yarn

```bash
  yarn add wcard-gen
```
    
## Usage/Examples

```javascript
// Importing module
const { Wcard } = require("wcard-gen");

// Creating the card
const welcomecard = new Wcard()
    .setName("iPuppyYT")
    .setAvatar('https://gravatar.com/userimage/245140636/a6f456c3200da7bdf2c013cbb0f7e819.jpeg')
    .setTitle("Welcome to Server")
    .setColor("00e5ff") // hex code without #
    .setBackground(`https://cdn.openart.ai/stable_diffusion/96564103ae44eb3ff1f38d84a7c858f561a08d92_2000x2000.webp`)
  
// Building the card
const card = await welcomecard.build();
```

## Screenshots

![App Screenshot](https://raw.githubusercontent.com/ipuppyyt/wcard-gen/main/example/ipuppyyt.png)


## Features

- Highly Customizable
- Cross platform


## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0)


## Support

For support, open a [issue](https://github.com/ipuppyyt/wcard-gen/issues).

