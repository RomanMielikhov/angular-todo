import { Component, Input, OnInit } from '@angular/core';

import { IUserToDoListItem } from 'src/app/shared/interfaces/todo.interface';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item!: IUserToDoListItem;

  ngOnInit(): void {
    if (!this.item.image) return;
    if (typeof Worker === 'undefined') return;
    console.log(this.item);
    const image = new Image();
    image.src = this.item.image;

    const canvas = document.createElement('canvas');

    image.onload = () => {
      const ctx = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;

      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        image.width,
        image.height
      );

      const worker = new Worker(
        new URL('/src/app/workers/image-filter.worker.ts', import.meta.url)
      );

      worker.postMessage({
        imagedata: ctx!.getImageData(0, 0, canvas.width, canvas.height),
        width: canvas.width,
        height: canvas.height,
      });

      worker.onmessage = ({ data }) => {
        ctx!.putImageData(data, 0, 0);

        this.item.image = canvas.toDataURL('image/jpeg');
      };
    };
  }
}
