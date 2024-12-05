import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  userId = '';
  userDetails: any = {};
  userRatings: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
    this.getUserData();
  }

  async getUserData(): Promise<void> {
    try {
      this.userDetails = await this.userService.getUserData(this.userId);
      this.userRatings = this.userDetails.ratings || 0;
      this.calRatingAvg(this.userRatings);
    } catch {}
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }

  calRatingAvg(ratings: any) {
    let avgStars = 0;

    ratings.forEach((rating: any) => {
      avgStars += rating.stars;
    });

    avgStars = avgStars / ratings.length;
    this.userDetails.totalRating = avgStars;
  }
}
