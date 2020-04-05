# Dropper.mood

The best Vue.js dropdown.

## Description

Dropper.mood is an intelligent dropdown component designed with Vue.js. It can be integrated into any Vue.js project and with several options and functionalities.

## Documentation

[Documentation](https://domutala.github.io/droppermood)

## Installing

```PowerShell
# npm
npm i --save dropper.mood

# yarn
yarn add dropper.mood

```

## Usage

Dropper.mood is very simple to use.

### Overall use

```Javascript
import Vue from 'vue';
import dropper from 'dropper.mood';
import 'dropper.mood/dist/dropper.css';

Vue.use(dropper);
```

### Single file

```Vue
<script lang="js">
import { MdDropper } from "dropper.mood";
import 'dropper.mood/dist/dropper.css';

export default {
  components: {
    MdDropper
  }
}
</script>
```

### In your vue.js file

After that you can use the component in your code as follows.

```Vue
<template>
  <div id="app">
    <div id="join-element-id">
      join element
    </div>
    <md-dropper join="#join-element-id">
      <!-- Your code hear -->
    </md-dropper>
  </div>
</template>
```

## Props

### join

- **type**: _any_
- **requred**: _true_

It is a valid html selector as an id, a class or any other properties allowing to select the element attached to the dropdown. The dropdown position will be calculated based on the position of the join element.

### align

- **type**: _string_
- **requred**: _false_
- **value**: _left_ | _right_ | _top_ | _bottom_

This property defines the dropdown alignment. The latter can be placed on the left, right, top or bottom. If it is not, the alignment will be calculated automatically with respect to the
**direction** property.

### direction

- **type**: _string_
- **requred**: _false_
- **value**: _x_ | _y_

This property defines the alignment direction of the dropdown. If its value is _x_, the dropdown will align either to the left or to the right of the join element. If its value is **y**, the dropdown will be aligned either at the top or at the bottom of the join element. The default value is **y**. If the **align** property is defined, the **direction** property is not taken into account to calculate the position of the dropdown.

### hide-arrow

- **type**: _boolean_
- **requred**: _false_
- **value**: _true_ | _false_

This property allows you to display or hide the arrow.

### justify

- **type**: _boolean_
- **requred**: _false_
- **value**: _true_ | _false_

If true, the dropdown will be placed in the middle of the join element. This property is only taken into account if the display screen allows centered alignment.

### show-on

- **type**: _string_ | _array_
- **requred**: _false_
- **default**: _click_

this property defines the events of the join element which will trigger the opening of the dropdown. It can be a
**string** if it is a single event or an array of **string** if it is several. The default value is **click**.

### hide-on

- **type**: _string_ | _array_
- **requred**: _false_

this property defines the events of the join element which will trigger the closure of the dropdown. It can be a **string** if it is a single event or an array of **string** if it is several.

### z-index

- **type**: _number_
- **requred**: _true_
- **default**: _5000_

Choose a large value so that the dropdown is not hidden by other dropdowns.

### position-on-resize

- **type**: _boolean_
- **requred**: _true_

If true, the position of the dropdown will be calculated each time the size of the window is modified.

### position-on-scroll

- **type**: _boolean_
- **requred**: _false_

If true, the position of the dropdown will be calculated with each scroll of the window.

## Events

### open

The event is triggered each time the dropdown opens.

### close

The event is triggered each time the dropdown closes.

### align

**type**: _string_
**value**: _left_ | _right_ | _top_ | _bottom_

Returns the position of the dropdown relative to the join element after opening. The values that can be sent are: left, right, top, bottom.

### arrow-align

**type**: _string_
**value**: _left_ | _right_ | _top_ | _bottom_

Returns the position of the arrow relative to the dropdown join after opening. The values that can be sent are: left, right, top, bottom.

### arrow-on

**type**: _string_
**value**: _left_ | _right_ | _top_ | _bottom_ | _middle_

Returns the position of the arrow relative to the dropdown join after opening.

### justify

**type**: _boolean_
**value**: _true_ | _false_

Returns true if the dropdown is positioned in the middle of the join element, and false otherwise.

### esc-keydown

Triggers when the escape button is pressed while the dropdown is open.

### other-area-clicked

Fires when a zone other than the dropdown receives a click while the dropdown is open.

## Functions

You can access certain dropdown functions such as **open** and **close**. These two functions will respectively allow you to open and close the dropdown. Here is an example of using the functions.

```Vue
<template>
  <div id="app">
    <div id="id-join-element" @click="openDropper">
      My join element
    </div>
    <md-dropper
      join="#id-join-element"
      ref="dropper"
      @esc-keydown="closeDropper"
      @other-area-clicked="closeDropper"
      class="my-super-dropdown"
      style="width: 250px; background-color: yellow; color: black; border-radius: .3em;"
    >
        <!-- Your code hear -->
    </md-dropper>

    <button @click="openDropper">
      open dropdown
    </button>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  // ...

  methods: {
    methods: {
      openDropper() {
        const dropper = this.$refs.dropper;
        if (dropper) {
          dropper.open();
        }
      }

      closeDropper() {
        const dropper = this.$refs.dropper;
        if (dropper) {
          dropper.close();
        }
      }
    }
  }
}
</script>
```

## Author

**[@domutala](https://github.com/domutala)**

## License

[MIT](https://github.com/domutala/dropper.mood/blob/master/LICENCE/)
