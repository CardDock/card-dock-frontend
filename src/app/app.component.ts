import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthFacade } from 'src/context/auth/application/facades/auth.facade';
import { AuthModule } from 'src/context/auth/auth.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, AuthModule],
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(private readonly authFacade: AuthFacade) {}

	ngOnInit() {
		this.authFacade.initialize();
	}
}
