import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SkillsService } from 'src/app/services/skills.service';
import { SearchService } from 'src/app/services/search.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    skill: new FormControl(''),
    rating: new FormControl(''),
  });

  skills: any = [];

  staffData: any = [];

  constructor(
    private searchService: SearchService,
    private skillService: SkillsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: [''],
      skill: [''],
      rating: [''],
    });

    this.getSkillsData();
  }

  async getSkillsData() {
    this.skills = await this.skillService.getAllSkills();
  }

  async onSubmit() {
    try {
      const query = Object.keys(this.searchForm.value).reduce(
        (acc: any, curr: any) => {
          if (this.isEmptyObject(this.searchForm.value, curr)) return acc;
          acc[curr] = this.searchForm.value[curr];
          return acc;
        },
        {}
      );

      this.staffData = await this.searchService.getUsers(query);
    } catch {}
  }

  isEmptyObject(obj: any, key: any) {
    return (
      obj[key] === null ||
      (Array.isArray(obj[key]) && obj[key].length === 0) ||
      obj[key] === ''
    );
  }
}
