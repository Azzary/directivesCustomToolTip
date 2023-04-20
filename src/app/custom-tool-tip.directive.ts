import { ContentChild, Directive, ElementRef, HostBinding, HostListener, Input, ViewChild } from '@angular/core';

@Directive({
  selector: '[appCustomToolTip]'
})
export class CustomToolTipDirective {

  constructor(private el: ElementRef) { }


  @ContentChild('customToolTipContent') ToolTipContent!: ElementRef;

  @Input() customToolTipPosition: string = '';
  listPos = ['top', 'bottom', 'left', 'right'];

  ngAfterViewInit() {
    this.ToolTipContent.nativeElement.style.display = 'none';
    this.ToolTipContent.nativeElement.style.position = 'absolute';
  }

  top(toolTipHeight: number, toolTipWidth: number, parentPos: any) {
    if (toolTipWidth < parentPos.width) {
      this.ToolTipContent.nativeElement.style.top = parentPos.top - toolTipHeight + 'px';
      this.ToolTipContent.nativeElement.style.left = parentPos.left + (parentPos.width / 2 - toolTipWidth) + 'px';
      return;
    }
    this.ToolTipContent.nativeElement.style.top = parentPos.top - toolTipHeight + 'px';
    this.ToolTipContent.nativeElement.style.left = parentPos.left + 'px';
  }

  bot(toolTipHeight: number, toolTipWidth: number, parentPos: any) {
    if (toolTipWidth < parentPos.width-2) {
      this.ToolTipContent.nativeElement.style.top = parentPos.bottom + 'px';
      this.ToolTipContent.nativeElement.style.left = parentPos.left + (parentPos.width / 2 - toolTipWidth)  + 'px';
      return;
    }
    this.ToolTipContent.nativeElement.style.top = parentPos.bottom + 'px';
    this.ToolTipContent.nativeElement.style.left = parentPos.left + 'px';
  }

  left(toolTipHeight: number, toolTipWidth: number, parentPos: any) {
    this.ToolTipContent.nativeElement.style.top = parentPos.top + 'px';
    this.ToolTipContent.nativeElement.style.left = parentPos.left - 5 - toolTipWidth + 'px';
  }

  right(toolTipHeight: number, toolTipWidth: number, parentPos: any) {
    this.ToolTipContent.nativeElement.style.top = parentPos.top + 'px';
    this.ToolTipContent.nativeElement.style.left = parentPos.right + 5 + 'px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.ToolTipContent) return;

    this.ToolTipContent.nativeElement.style.display = '';
    const parentPos = this.el.nativeElement.getBoundingClientRect();
    const toolTipHeight = this.ToolTipContent.nativeElement.offsetHeight;
    const toolTipWidth = this.ToolTipContent.nativeElement.offsetWidth;
    console.log(parentPos);
    switch (this.customToolTipPosition) {
      case 'top':
        this.top(toolTipHeight, toolTipWidth, parentPos);
        break;
      case 'bot':
        this.bot(toolTipHeight, toolTipWidth, parentPos);
        break;
      case 'left':
        this.left(toolTipHeight, toolTipWidth, parentPos);
        break;
      case 'right':
        this.right(toolTipHeight, toolTipWidth, parentPos);
        break;
      default:
        if (toolTipHeight < parentPos.top) {
          this.top(toolTipHeight, toolTipWidth, parentPos)
        }
        else if (toolTipHeight < window.innerHeight - parentPos.bottom) {
          this.bot(toolTipHeight, toolTipWidth, parentPos);
        }
        else if (toolTipWidth < parentPos.left) {
          this.left(toolTipHeight, toolTipWidth, parentPos);
        }
        else if (toolTipWidth < window.innerWidth - parentPos.right) {
          this.right(toolTipHeight, toolTipWidth, parentPos);
        }
        else {
          this.ToolTipContent.nativeElement.style.top = parentPos.top + 'px';
          this.ToolTipContent.nativeElement.style.left = parentPos.left + 'px';
        }
        break;
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.ToolTipContent) return;
    this.ToolTipContent.nativeElement.style.display = 'none';
  }

}
