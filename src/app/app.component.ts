import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from 'src/context/auth/auth.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, AuthModule],
	templateUrl: './app.component.html',
})
export class AppComponent {
	title = 'angular-dev-enhanced';
}
