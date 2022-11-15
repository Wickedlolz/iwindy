import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../core/interfaces';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  handleCreate($event: SubmitEvent): void {
    $event.preventDefault();
    const formData = new FormData($event.target as HTMLFormElement);
    const model = formData.get('model')?.toString() || '';
    const price = Number(formData.get('price')?.toString()) || 0;
    const released = formData.get('released')?.toString() || '';
    const weight = formData.get('weight')?.toString() || '';
    const os = formData.get('os')?.toString() || '';
    const memory = formData.get('memory')?.toString() || '';
    const displaySize = Number(formData.get('displaySize')) || 0;
    const displayResolutions =
      formData.get('displayResolutions')?.toString() || '';
    const cameraMP = Number(formData.get('cameraMP')?.toString()) || 0;
    const cameraVideo = formData.get('cameraVideo')?.toString() || '';
    const ram = Number(formData.get('ram')?.toString()) || 0;
    const chipset = formData.get('chipset')?.toString() || '';
    const batteryMAH = Number(formData.get('batteryMAH')?.toString()) || 0;
    const batteryType = formData.get('batteryType')?.toString() || '';
    const image = formData.get('image')?.toString() || '';
    const video = formData.get('video')?.toString() || '';
    const category = formData.get('category')?.toString() || '';

    const data: IProduct = {
      model,
      price,
      released,
      weight,
      os,
      memory,
      displaySize,
      displayResolutions,
      cameraMP,
      cameraVideo,
      ram,
      chipset,
      batteryMAH,
      batteryType,
      image,
      video,
      category,
      creator: '636399eb129a6b9f0de9528e',
    };

    this.productService.create$(data).subscribe({
      next: (product) => alert('Product Created'),
      error: (error) => alert(error.message),
    });
  }
}
