/// <reference path="node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from "angular2/platform/browser";
import { Component } from "angular2/core";

@Component({
  selector: 'hello-world',
  template: `
  <ul>
    <li *ngFor="#name of names">Hello {{name}}</li>
  </ul>
  `
})
class HelloWorld {
  names: string[];

  constructor(){
    this.names = ['Ari', 'Carlos', 'Felipe', 'Nate']
  }
}

bootstrap(HelloWorld);

class Article {
  title: string;
  link: string;
  votes: number;

  constructor(title: string, link: string, votes?: number){
    this.title = title;
    this.link = link;
    this.votes = votes || 0;
  }

  voteUp(): void{
    this.votes +=1;
  }
  voteDown(): void{
    this.votes -=1;
  }

  domain(): string{
    try {
      const link: string = this.link.split('//')[1];
      return link.split('/')[0];
    } catch(err){
      return null;
    }
  }
}

@Component({
  selector: 'reddit-article',
  inputs: ['article'],
  host: {
    class: 'row'
  },
  template: `
  <div class="four wide column center aligned votes">
    <div class="ui statistic">
      <div class="value">
        {{article.votes}}
      </div>
      <div class="label">
        Points
      </div>
    </div>
  </div>
  <div class="twelve wide column">
    <a class="ui large header" href="{{article.link}}">
        {{article.title}}
    </a>
    <div class="meta">
      ({{article.domain()}})
    </div>
    <ul class="ui big horizontal list voters">
      <li class="item">
        <a href (click)="voteUp()">
          <i class="arrow up icon"></i>
          upvote
        </a>
      </li>
      <li class="item">
        <a href (click)="voteDown()">
          <i class="arrow down icon"></i>
          downvote
        </a>
      </li>
    </ul>
  </div>
  `
})
class ArticleCompontent {
  article: Article;

  voteUp(): boolean{
    this.article.voteUp();
    return false;
  }

  voteDown(): boolean{
    this.article.voteDown();
    return false;
  }
}

@Component({
  selector: 'reddit',
  directives: [ArticleCompontent],
  template: `
    <form class="ui large form segment">
      <h3 class="ui header">Add a link</h3>

      <div class="field">
        <label for="title">Title:</label>
        <input name="title" #newtitle>
      </div>

      <div class="field">
        <label for="link">Link:</label>
        <input name="link" #newLink>
      </div>

      <button (click)="addArticle(newtitle, newLink)"
        class="ui positive right floated button">
        Submit Link
      </button>
    </form>

    <div class="ui grid posts">
      <reddit-article
        *ngFor="#foobar of sortedArticles()"
        [article]="foobar">
        </reddit-article>
    </div>
  `
})
class RedditApp {
  articles: Article[];

  constructor(){
    this.articles = [
      new Article('angular2', 'http://angular.io', 3),
      new Article('Fullstack', 'http://fullstack.io', 2),
      new Article('Angular Homepage', 'http://angular.io', 3),
      new Article('David McQueen', 'http://dmcqueen.co.uk')
    ];
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.articles.push(new Article(title.value, link.value))
    title.value = '';
    link.value = '';
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
}

bootstrap(RedditApp);
