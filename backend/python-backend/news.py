import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def scrape_krishi_jagran():
    url = "https://krishijagran.com"
    response = requests.get(url, verify=False)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all elements with class 'pst'
    pst_elements = soup.find_all('div', class_='pst')[:3]  # Get only top 3
    
    articles = []
    for pst in pst_elements:
        # Find link element
        link_element = pst.find('a')
        link = urljoin(url, link_element['href']) if link_element else None
        articles.append(link)
    
    return articles


def scrape_article(url):
    # Make the request
    response = requests.get(url, verify=False)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Get title from head
    title = soup.head.title.text.strip() if soup.head and soup.head.title else "No title found"
    
    # First find the figure element, then find the image within it
    figure = soup.find('figure')
    if figure:
        image = figure.find('img', class_='img-fluid')
        image_url = image.get('src') if image else "No image found"
        image_caption = image.get('alt') if image else "No caption found"
    else:
        image_url = "No image found"
        image_caption = "No caption found"
    
    return {
        'url' : url,
        'title': title,
        'image_url': image_url,
    }




def news():
    # Run the scraper
    articles = scrape_krishi_jagran()

    # Print results in a readable format
    # empty dict
    data = []

    for article in articles:
        result = scrape_article(article)
        data.append(result)


    for d in data:
        print(d)
    
    return data


if __name__ == '__main__':
    news()
    