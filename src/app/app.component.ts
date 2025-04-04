import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import 'zone.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            FormsModule,
            ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Ligue de hockey';
}
