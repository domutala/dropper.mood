<template>
  <transition appear name="dropper">
    <div
      v-show="show"
      id="dropper"
      class="md-dropper"
      v-on="listeners"
      :class="[
        { 'hide-arrow': hideArrow },
        `arrow-${alignArrow}`,
        `arrow-on-${arrowOn}`
      ]"
      :style="position"
    >
      <span class="before" :style="styleBefore"></span>
      <span class="after" :style="styleAfter"></span>
      <div class="dropper-container">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import '@/assets/styles/index.scss';

@Component
export default class MPopup extends Vue {
  @Prop({ required: true })
  private join: any;

  @Prop({
    type: String,
    validator: val => {
      const values = ['left', 'right', 'top', 'bottom'];
      return values.includes(val);
    }
  })
  private align: any;

  @Prop({
    type: String,
    default: 'y',
    validator: val => {
      const values = ['x', 'y'];
      return values.includes(val);
    }
  })
  private direction: any;

  @Prop({
    type: String,
    validator: val => {
      const values = ['left', 'right', 'top', 'bottom'];
      return values.includes(val);
    }
  })
  private orientation: any;

  @Prop({ type: Boolean })
  private hideArrow: any;

  @Prop({ type: Boolean, default: false })
  private justify: any;

  @Prop({ type: [String, Array], default: 'click' })
  private showOn: any;

  @Prop({ type: [String, Array] })
  private hideOn: any;

  @Prop({ type: Number, required: false, default: 50000 })
  private zIndex: any;

  @Prop({ type: Boolean, default: true })
  private positionOnResize: any;

  @Prop({ type: Boolean, default: false })
  private positionOnScroll: any;

  @Prop({ type: Boolean, default: false })
  private fixed: any;

  private alignArrow: string = 'top';
  private arrowOn: string = 'left';
  private position: string = '';
  private show: boolean = false;
  private styleBefore: string = '';
  private styleAfter: string = '';

  public get listeners() {
    return {
      ...this.$listeners,
      click: (event: any) => {
        this.$emit('click', event);
      },
      dblclick: (event: any) => {
        this.$emit('dblclick', event);
      },

      focus: (event: any) => {
        this.$emit('focus', event);
      },
      focusin: (event: any) => {
        this.$emit('focusin', event);
      },
      focusout: (event: any) => {
        this.$emit('focusout', event);
      },

      blur: (event: any) => {
        this.$emit('blur', event);
      },
      scroll: (event: any) => {
        this.$emit('scroll', event);
      },
      resize: (event: any) => {
        this.$emit('resize', event);
      },

      keyup: (event: any) => {
        this.$emit('keyup', event);
      },
      keydown: (event: any) => {
        this.$emit('keydown', event);
      },
      keypress: (event: any) => {
        this.$emit('keypress', event);
      },

      mouseenter: (event: any) => {
        this.$emit('mouseenter', event);
      },
      mousedown: (event: any) => {
        this.$emit('mousedown', event);
      },
      mousemove: (event: any) => {
        this.$emit('mousemove', event);
      },
      mouseout: (event: any) => {
        this.$emit('mouseout', event);
      },
      mouseup: (event: any) => {
        this.$emit('mouseup', event);
      },
      mousewheel: (event: any) => {
        this.$emit('mousewheel', event);
      },
      mouseleave: (event: any) => {
        this.$emit('mouseleave', event);
      },

      touchstart: (event: any) => {
        this.$emit('touchstart', event);
      },
      touchmove: (event: any) => {
        this.$emit('touchmove', event);
      },
      touchcancel: (event: any) => {
        this.$emit('touchcancel', event);
      },
      touchend: (event: any) => {
        this.$emit('touchend', event);
      }
    };
  }

  private elmt() {
    const join: Element = document.querySelector(this.join);
    if (join) {
      const rect = join.getBoundingClientRect();

      if (rect) {
        const scroll = {
          top: window.scrollY,
          left: window.scrollX
        };
        const elmt = {
          scroll,
          position: {
            real: {
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              right: rect.right + window.scrollX,
              bottom: rect.bottom + window.scrollY
            },
            viewport: {
              top: rect.top,
              left: rect.left,
              right: rect.right,
              bottom: rect.bottom
            }
          },
          size: {
            width: rect.width,
            height: rect.height
          },
          join
        };

        return elmt;
      }
    }

    return undefined;
  }

  private setPosition() {
    this.position = `z-index: ${this.zIndex};`;
    this.position += this.fixed ? 'position: fixed !important;' : '';
    this.styleBefore = '';
    this.styleAfter = '';
    let restH: number = 0;
    let restW: number = 0;
    const elmt = this.elmt();
    const el = this.$el;
    let justify: boolean = false;

    const canJustify = (r1: number, r2: number, h: number) => {
      return r1 > h && r2 > h;
    };

    const setArrowPosition = (
      side: 'left' | 'right' | 'top' | 'bottom',
      elt: any,
      calc: 'width' | 'height' = 'width'
    ) => {
      const b = elt.size[calc] / 2;
      const a = elt.size[calc] / 2;
      const calcEl = el.getBoundingClientRect()[calc];

      this.styleBefore = `${side}: ${b > 15 && b < calcEl ? b - 15 : 4}px;`;
      this.styleAfter = `${side}: ${a > 15 && b < calcEl ? a - 7.5 : 11.5}px;`;
    };

    if (elmt && el) {
      restH = window.innerHeight - elmt.position.viewport.top;
      restW = window.innerWidth - elmt.position.viewport.left;

      let align = this.align;

      if (!align && this.direction === 'y') {
        if (restH > elmt.position.viewport.top) {
          align = 'bottom';
        } else {
          align = 'top';
        }
      } else if (!align && this.direction === 'x') {
        if (restW > elmt.position.viewport.left) {
          align = 'right';
        } else {
          align = 'left';
        }
      }

      if (align === 'bottom') {
        this.position += `top: ${elmt.position.real.bottom}px;`;
        this.alignArrow = 'top';
      } else if (align === 'top') {
        this.position += `top: ${elmt.position.real.top -
          el.getBoundingClientRect().height -
          8}px;`;
        this.alignArrow = 'bottom';
      } else if (align === 'left') {
        this.position += `right: ${restW}px;`;
        this.alignArrow = 'right';
      } else if (align === 'right') {
        this.position += `left: ${elmt.position.real.left +
          elmt.size.width}px;`;
        this.alignArrow = 'left';
      }

      if (align === 'bottom' || align === 'top') {
        const half = el.getBoundingClientRect().width / 2;
        const refLeft = elmt.position.viewport.left + elmt.size.width / 2;
        const refRight =
          window.innerWidth -
          elmt.position.viewport.right +
          elmt.size.width / 2;

        if (
          this.orientation &&
          (this.orientation === 'left' || this.orientation === 'right')
        ) {
          if (this.orientation === 'right') {
            this.arrowOn = 'left';
            this.position += `left: ${elmt.position.real.left}px;`;
            setArrowPosition('left', elmt);
          } else {
            this.position += `right: ${window.innerWidth -
              elmt.position.real.right}px;`;
            this.arrowOn = 'right';
            setArrowPosition('right', elmt);
          }
        } else if (this.justify && canJustify(refLeft, refRight, half)) {
          justify = true;
          this.position += `left: ${elmt.position.real.left -
            half +
            elmt.size.width / 2}px;`;
          this.arrowOn = 'middle';
        } else if (restW > elmt.position.viewport.left) {
          this.arrowOn = 'left';
          this.position += `left: ${elmt.position.real.left}px;`;
          setArrowPosition('left', elmt);
        } else {
          this.position += `right: ${window.innerWidth -
            elmt.position.real.right}px;`;
          this.arrowOn = 'right';
          setArrowPosition('right', elmt);
        }
      } else if (align === 'left' || align === 'right') {
        const half = el.getBoundingClientRect().height / 2;
        const refTop = elmt.position.viewport.top + elmt.size.height / 2;
        const refBottom =
          window.innerHeight -
          elmt.position.viewport.bottom +
          elmt.size.height / 2;

        if (
          this.orientation &&
          (this.orientation === 'top' || this.orientation === 'bottom')
        ) {
          if (this.orientation === 'bottom') {
            this.arrowOn = 'top';
            this.position += `top: ${elmt.position.real.top}px;`;
            setArrowPosition('top', elmt, 'height');
          } else {
            this.position += `top: ${elmt.position.real.bottom -
              el.getBoundingClientRect().height}px;`;
            this.arrowOn = 'bottom';
            setArrowPosition('bottom', elmt, 'height');
          }
        } else if (this.justify && canJustify(refTop, refBottom, half)) {
          this.position += `top: ${elmt.position.real.top -
            half +
            elmt.size.height / 2}px;`;
          this.arrowOn = 'middle';
          justify = true;
        } else if (restH > elmt.position.viewport.top) {
          this.arrowOn = 'top';
          this.position += `top: ${elmt.position.real.top}px;`;
        } else {
          this.position += `top: ${elmt.position.real.bottom -
            el.getBoundingClientRect().height}px;`;
          this.arrowOn = 'bottom';
        }
      }

      setTimeout(() => {
        this.$emit('align', align);
        this.$emit('arrow-on', this.arrowOn);
        this.$emit('arrow-align', this.alignArrow);
        this.$emit('justify', justify);
      }, 0);
    }
  }

  private open() {
    if (this.elmt() && !this.show) {
      this.show = true;
      this.insertInBody();
      setTimeout(() => {
        this.setPosition();
        this.setHideEvents();
      }, 0);
    }
  }

  private escKeydownTesting(e: any): void {
    if (e.keyCode === 27) {
      this.$emit('esc-keydown');
    }
  }

  private close(): void {
    this.show = false;
    setTimeout(() => {
      this.position = '';
      this.insertInThis();
      this.removeHideEvents();
    }, 250);
  }

  private insertInBody() {
    if (this.elmt()) {
      const [body] = document.getElementsByTagName('body');
      body.insertBefore(this.$el, body.firstChild);

      setTimeout(() => {
        window.addEventListener('click', this.anOtherAreaClick);
        window.addEventListener('keydown', this.escKeydownTesting);
        this.$el.addEventListener('mouseenter', this.disableAnOtherClickedArea);
        this.$el.addEventListener('mouseleave', this.enableAnOtherClickedArea);

        if (this.positionOnResize) {
          window.addEventListener('resize', this.setPosition);
        }
        if (this.positionOnScroll) {
          window.addEventListener('scroll', this.setPosition);
        }
        this.$emit('open');
      }, 0);
    }
  }

  private anOtherAreaClick(e: any): void {
    this.$emit('other-area-clicked');
  }
  private disableAnOtherClickedArea() {
    window.removeEventListener('click', this.anOtherAreaClick);
  }
  private enableAnOtherClickedArea() {
    window.addEventListener('click', this.anOtherAreaClick);
  }

  private insertInThis() {
    const [parent] = document.getElementsByTagName('body');

    if (parent && this.$el && this.$el.parentNode === parent) {
      window.removeEventListener('keydown', this.escKeydownTesting);
      window.removeEventListener('resize', this.setPosition);
      window.removeEventListener('scroll', this.setPosition);

      window.removeEventListener('click', this.anOtherAreaClick);
      this.$el.removeEventListener(
        'mouseenter',
        this.disableAnOtherClickedArea
      );
      this.$el.removeEventListener('mouseleave', this.enableAnOtherClickedArea);

      parent.removeChild(this.$el);
    }

    setTimeout(() => {
      this.$emit('close');
    }, 0);
  }

  private beforeDestroy() {
    this.insertInThis();
  }

  private setShowEvents() {
    const elmt = this.elmt();
    if (this.showOn && elmt) {
      if (typeof this.showOn === 'string') {
        elmt.join.addEventListener(this.showOn, this.open);
      } else if (typeof this.showOn === 'object') {
        for (const showOn of this.showOn) {
          elmt.join.addEventListener(showOn, this.open);
        }
      }
    }
  }
  private setHideEvents() {
    const elmt = this.elmt();
    if (this.hideOn && elmt) {
      if (typeof this.hideOn === 'string') {
        elmt.join.addEventListener(this.hideOn, this.close);
      } else if (typeof this.hideOn === 'object') {
        for (const hideOn of this.hideOn) {
          elmt.join.addEventListener(hideOn, this.close);
        }
      }
    }
  }
  private removeHideEvents() {
    const elmt = this.elmt();
    if (this.hideOn && elmt) {
      if (typeof this.hideOn === 'string') {
        elmt.join.removeEventListener(this.hideOn, this.close);
      } else if (typeof this.hideOn === 'object') {
        for (const hideOn of this.hideOn) {
          elmt.join.removeEventListener(hideOn, this.close);
        }
      }
    }
  }

  private mounted() {
    this.setShowEvents();
  }
}
</script>
