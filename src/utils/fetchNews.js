import { formatDistanceToNow } from 'date-fns';

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
const ET_MARKETS_RSS = 'https://news.google.com/rss/search?q=finance+OR+stock+market+india+when:1d&hl=en-IN&gl=IN&ceid=IN:en';
const COINTELEGRAPH_RSS = 'https://news.google.com/rss/search?q=crypto+OR+bitcoin+india+when:1d&hl=en-IN&gl=IN&ceid=IN:en';

/**
 * Fetches and formats live aggregated news from Google News via rss2json.
 * Uses a timestamp query to aggressively bypass rss2json caching.
 */
export const fetchLiveNews = async () => {
  try {
    // Append unique timestamp to the target URL so rss2json treats it as a new un-cached feed request
    const stockUrl = `${ET_MARKETS_RSS}&cb=${Date.now()}`;
    const cryptoUrl = `${COINTELEGRAPH_RSS}&cb=${Date.now()}`;

    const [stocksResponse, cryptoResponse] = await Promise.all([
      fetch(`${RSS2JSON_API}${encodeURIComponent(stockUrl)}`),
      fetch(`${RSS2JSON_API}${encodeURIComponent(cryptoUrl)}`)
    ]);

    const stocksData = await stocksResponse.json();
    const cryptoData = await cryptoResponse.json();

    let combinedNews = [];

    // Helper to map rs2json format into our standard UI shape
    const mapItems = (items, category, fallbackSource) => {
      return items.map((item, index) => {
        // Clean Title ("Headline - Source Name" -> "Headline")
        const cleanTitle = item.title.includes(' - ') 
          ? item.title.split(' - ').slice(0, -1).join(' - ') 
          : item.title;
          
        // Extract publisher from the title suffix ("Headline - Publisher")
        const actualSource = item.title.includes(' - ') 
          ? item.title.split(' - ').slice(-1)[0] 
          : fallbackSource;
          
        return {
          id: `${category.toLowerCase()}-${index}-${Date.now()}`,
          category: category,
          title: cleanTitle,
          description: item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
          time: formatDistanceToNow(new Date(item.pubDate), { addSuffix: true }),
          pubDate: new Date(item.pubDate),
          source: actualSource,
          url: item.link
        };
      });
    };

    if (stocksData.status === 'ok' && stocksData.items) {
      combinedNews = [...combinedNews, ...mapItems(stocksData.items, 'Stocks', 'Google News')];
    }

    if (cryptoData.status === 'ok' && cryptoData.items) {
      combinedNews = [...combinedNews, ...mapItems(cryptoData.items, 'Crypto', 'Google News')];
    }

    // Sort combined news by published date (newest first)
    combinedNews.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

    return combinedNews;
  } catch (error) {
    console.error('Error fetching live news:', error);
    return null; // Return null to indicate failure, so caller can use fallback data
  }
};
