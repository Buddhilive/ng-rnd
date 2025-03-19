import { ComponentRef, EmbeddedViewRef, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { CsiDialogComponentComponent } from './csi-dialog-component/csi-dialog-component.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {
  private componentRef!: ComponentRef<CsiDialogComponentComponent>;
  constructor(private viewContainer: ViewContainerRef) {}

  open() {
    this.componentRef = this.viewContainer.createComponent(CsiDialogComponentComponent);
    console.log(this.componentRef);

    this.componentRef.instance.dialogClose.subscribe((res: any) => {
      console.log(res);

      this.close();
    });
  }

  close() {
    this.componentRef.destroy();
  }

  extractTemplateRefs(componentRef: any): {
    header?: EmbeddedViewRef<any>;
    body?: EmbeddedViewRef<any>;
    footer?: EmbeddedViewRef<any>;
  } | null {

    if (!componentRef) {
      console.warn('TemplateExtractorService: ComponentRef is null or undefined.');
      return null;
    }

    const result: { header?: EmbeddedViewRef<any>; body?: EmbeddedViewRef<any>; footer?: EmbeddedViewRef<any>; } = {};

    // Use 'header', 'body', and 'footer' as the template reference names.
    const headerTemplate: TemplateRef<any> | null = componentRef['header'];
    const bodyTemplate: TemplateRef<any> | null = componentRef['body'];
    const footerTemplate: TemplateRef<any> | null = componentRef['footer'];

    if (headerTemplate) {
      result.header = this.viewContainer.createEmbeddedView(headerTemplate);
    }
    if (bodyTemplate) {
      result.body = this.viewContainer.createEmbeddedView(bodyTemplate);
    }
    if (footerTemplate) {
      result.footer = this.viewContainer.createEmbeddedView(footerTemplate);
    }

    console.log('Template', (componentRef as ComponentRef<any>).instance)

    return result;
  }
}
