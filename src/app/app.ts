import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ProgressBarComponent } from './shared/ui/progress-bar/progress-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ProgressBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
